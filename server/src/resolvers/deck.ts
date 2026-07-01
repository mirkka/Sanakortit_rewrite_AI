import { BatchWriteCommand, DeleteCommand, GetCommand, PutCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { GraphQLError } from 'graphql'
import { v4 as uuidv4 } from 'uuid'
import { MutationResolvers, QueryResolvers } from '../generated/resolvers'

export const getDeckOrThrow = async (dynamodb: DynamoDBDocumentClient, deckId: string, userId: string) => {
  const result = await dynamodb.send(
    new GetCommand({
      TableName: 'sanakortit-decks',
      Key: { deckId },
    }),
  )

  if (!result.Item || result.Item.userId !== userId) {
    throw new GraphQLError(`Deck ${deckId} not found`, {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  return result.Item
}

const computeStatus = (weights: number[]): string | null => {
  if (weights.length === 0) return null
  if (weights.every((w) => w === 0)) return 'Finished'
  const avg = weights.reduce((sum, w) => sum + w, 0) / weights.length
  if (avg <= 1) return 'Good'
  if (avg <= 2) return 'Medium'
  return 'Hard'
}

const getCardStats = async (
  dynamodb: DynamoDBDocumentClient,
  deckId: string,
): Promise<{ lastStudied: string | null; numberOfCards: number; status: string | null }> => {
  const timestamps: string[] = []
  const weights: number[] = []
  let lastKey: Record<string, unknown> | undefined

  do {
    const result = await dynamodb.send(
      new QueryCommand({
        TableName: 'sanakortit-cards',
        KeyConditionExpression: 'deckId = :deckId',
        ExpressionAttributeValues: { ':deckId': deckId },
        ProjectionExpression: 'updatedAt, weight',
        ExclusiveStartKey: lastKey,
      }),
    )

    result.Items?.forEach((item) => {
      timestamps.push(item.updatedAt as string)
      weights.push(item.weight as number)
    })
    lastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined
  } while (lastKey)

  const lastStudied = timestamps.length === 0 ? null : timestamps.reduce((max, ts) => (ts > max ? ts : max))

  return { lastStudied, numberOfCards: timestamps.length, status: computeStatus(weights) }
}

const deleteAllCardsForDeck = async (dynamodb: DynamoDBDocumentClient, deckId: string) => {
  let lastKey: Record<string, unknown> | undefined

  do {
    const result = await dynamodb.send(
      new QueryCommand({
        TableName: 'sanakortit-cards',
        KeyConditionExpression: 'deckId = :deckId',
        ExpressionAttributeValues: { ':deckId': deckId },
        ProjectionExpression: 'deckId, cardId',
        ExclusiveStartKey: lastKey,
      }),
    )

    const items = result.Items ?? []

    for (let i = 0; i < items.length; i += 25) {
      await dynamodb.send(
        new BatchWriteCommand({
          RequestItems: {
            ['sanakortit-cards']: items.slice(i, i + 25).map((item) => ({
              DeleteRequest: { Key: { deckId: item.deckId, cardId: item.cardId } },
            })),
          },
        }),
      )
    }

    lastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined
  } while (lastKey)
}

export const deckQueryResolvers: Pick<QueryResolvers, 'getDecks' | 'getDeck'> = {
  getDecks: async (_, { userId }, { dynamodb }) => {
    console.log(dynamodb, 'dynamodb')
    const result = await dynamodb.send(
      new QueryCommand({
        TableName: 'sanakortit-decks',
        IndexName: 'userId-index',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId },
      }),
    )

    const decks = result.Items ?? []
    const statsList = await Promise.all(decks.map((deck) => getCardStats(dynamodb, deck.deckId as string)))

    return decks.map((deck, i) => ({ ...deck, ...statsList[i] })) as Array<{
      deckId: string; name: string; userId: string; createdAt: string; updatedAt: string; lastStudied: string | null; numberOfCards: number; status: string | null
    }>
  },

  getDeck: async (_, { userId, deckId }, { dynamodb }) => {
    const item = await getDeckOrThrow(dynamodb, deckId, userId)
    const stats = await getCardStats(dynamodb, deckId)

    return { ...item, ...stats } as { deckId: string; name: string; userId: string; createdAt: string; updatedAt: string; lastStudied: string | null; numberOfCards: number; status: string | null }
  },
}

export const deckMutationResolvers: Pick<MutationResolvers, 'createDeck' | 'updateDeck' | 'resetDeck' | 'deleteDeck'> = {
  createDeck: async (_, { userId, name }, { dynamodb }) => {
    const deckId = uuidv4()
    const now = new Date().toISOString()

    await dynamodb.send(
      new PutCommand({
        TableName: 'sanakortit-decks',
        Item: { deckId, name, userId, createdAt: now, updatedAt: now },
      }),
    )

    return { deckId, name, userId, createdAt: now, updatedAt: now, lastStudied: null, numberOfCards: 0, status: null }
  },

  updateDeck: async (_, { userId, deckId, name }, { dynamodb }) => {
    const existing = await getDeckOrThrow(dynamodb, deckId, userId)
    const updatedAt = new Date().toISOString()

    await dynamodb.send(
      new UpdateCommand({
        TableName: 'sanakortit-decks',
        Key: { deckId },
        UpdateExpression: 'SET #name = :name, updatedAt = :updatedAt',
        ExpressionAttributeNames: { '#name': 'name' },
        ExpressionAttributeValues: { ':name': name, ':updatedAt': updatedAt },
      }),
    )

    const stats = await getCardStats(dynamodb, deckId)
    return { deckId, name, userId, createdAt: existing.createdAt as string, updatedAt, ...stats }
  },

  resetDeck: async (_, { userId, deckId }, { dynamodb }) => {
    const existing = await getDeckOrThrow(dynamodb, deckId, userId)

    let lastKey: Record<string, unknown> | undefined
    const cardIds: string[] = []

    do {
      const result = await dynamodb.send(
        new QueryCommand({
          TableName: 'sanakortit-cards',
          KeyConditionExpression: 'deckId = :deckId',
          ExpressionAttributeValues: { ':deckId': deckId },
          ProjectionExpression: 'cardId',
          ExclusiveStartKey: lastKey,
        }),
      )
      cardIds.push(...(result.Items ?? []).map((item) => item.cardId as string))
      lastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined
    } while (lastKey)

    const now = new Date().toISOString()
    await Promise.all(
      cardIds.map((cardId) =>
        dynamodb.send(
          new UpdateCommand({
            TableName: 'sanakortit-cards',
            Key: { deckId, cardId },
            UpdateExpression: 'SET weight = :weight, updatedAt = :updatedAt',
            ExpressionAttributeValues: { ':weight': 3, ':updatedAt': now },
          }),
        ),
      ),
    )

    return {
      deckId,
      name: existing.name as string,
      userId,
      createdAt: existing.createdAt as string,
      updatedAt: existing.updatedAt as string,
      lastStudied: cardIds.length > 0 ? now : null,
      numberOfCards: cardIds.length,
      status: cardIds.length > 0 ? 'Hard' : null,
    }
  },

  deleteDeck: async (_, { userId, deckId }, { dynamodb }) => {
    await getDeckOrThrow(dynamodb, deckId, userId)
    await deleteAllCardsForDeck(dynamodb, deckId)

    await dynamodb.send(
      new DeleteCommand({
        TableName: 'sanakortit-decks',
        Key: { deckId },
      }),
    )

    return deckId
  },
}

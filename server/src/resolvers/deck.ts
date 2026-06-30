import { BatchWriteCommand, DeleteCommand, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { GraphQLError } from 'graphql'
import { v4 as uuidv4 } from 'uuid'
import { MutationResolvers, QueryResolvers } from '../generated/resolvers'

export const getDeckOrThrow = async (dynamodb: DynamoDBDocumentClient, deckId: string, userId: string) => {
  const result = await dynamodb.send(
    new GetCommand({
      TableName: process.env.DECKS_TABLE_NAME!,
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

const deleteAllCardsForDeck = async (dynamodb: DynamoDBDocumentClient, deckId: string) => {
  let lastKey: Record<string, unknown> | undefined

  do {
    const result = await dynamodb.send(
      new QueryCommand({
        TableName: process.env.CARDS_TABLE_NAME!,
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
            [process.env.CARDS_TABLE_NAME!]: items.slice(i, i + 25).map((item) => ({
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
    const result = await dynamodb.send(
      new QueryCommand({
        TableName: process.env.DECKS_TABLE_NAME!,
        IndexName: 'userId-index',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId },
      }),
    )

    return (result.Items ?? []) as Array<{ deckId: string; name: string; userId: string }>
  },

  getDeck: async (_, { userId, deckId }, { dynamodb }) => {
    const item = await getDeckOrThrow(dynamodb, deckId, userId)

    return item as { deckId: string; name: string; userId: string }
  },
}

export const deckMutationResolvers: Pick<MutationResolvers, 'createDeck' | 'deleteDeck'> = {
  createDeck: async (_, { userId, name }, { dynamodb }) => {
    const deckId = uuidv4()

    await dynamodb.send(
      new PutCommand({
        TableName: process.env.DECKS_TABLE_NAME!,
        Item: { deckId, name, userId },
      }),
    )

    return { deckId, name, userId }
  },

  deleteDeck: async (_, { userId, deckId }, { dynamodb }) => {
    await getDeckOrThrow(dynamodb, deckId, userId)
    await deleteAllCardsForDeck(dynamodb, deckId)

    await dynamodb.send(
      new DeleteCommand({
        TableName: process.env.DECKS_TABLE_NAME!,
        Key: { deckId },
      }),
    )

    return deckId
  },
}

import { DeleteCommand, GetCommand, PutCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { GraphQLError } from 'graphql'
import { v4 as uuidv4 } from 'uuid'
import { MutationResolvers, QueryResolvers } from '../generated/resolvers'
import { getDeckOrThrow } from './deck'

const DEFAULT_WEIGHT = 3

const getCardOrThrow = async (
  dynamodb: Parameters<typeof getDeckOrThrow>[0],
  deckId: string,
  cardId: string,
) => {
  const result = await dynamodb.send(
    new GetCommand({
      TableName: 'sanakortit-cards',
      Key: { deckId, cardId },
    }),
  )

  if (!result.Item) {
    throw new GraphQLError(`Card ${cardId} not found`, {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  return result.Item
}

export const cardQueryResolvers: Pick<QueryResolvers, 'getCardsForDeck'> = {
  getCardsForDeck: async (_, { userId, deckId }, { dynamodb }) => {
    await getDeckOrThrow(dynamodb, deckId, userId)

    const items: Array<{ cardId: string; deckId: string; text: string; textTranslation: string; weight: number; createdAt: string; updatedAt: string }> = []
    let lastKey: Record<string, unknown> | undefined

    do {
      const result = await dynamodb.send(
        new QueryCommand({
          TableName: 'sanakortit-cards',
          KeyConditionExpression: 'deckId = :deckId',
          ExpressionAttributeValues: { ':deckId': deckId },
          ExclusiveStartKey: lastKey,
        }),
      )

      items.push(...((result.Items ?? []) as typeof items))

      lastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined
    } while (lastKey)

    return items
  },
}

export const cardMutationResolvers: Pick<MutationResolvers, 'addCard' | 'deleteCard' | 'updateCard' | 'markCardDifficulty'> = {
  addCard: async (_, { userId, deckId, text, textTranslation }, { dynamodb }) => {
    await getDeckOrThrow(dynamodb, deckId, userId)

    const cardId = uuidv4()
    const weight = DEFAULT_WEIGHT
    const now = new Date().toISOString()

    await dynamodb.send(
      new PutCommand({
        TableName: 'sanakortit-cards',
        Item: { deckId, cardId, text, textTranslation, weight, createdAt: now, updatedAt: now },
      }),
    )

    return { cardId, deckId, text, textTranslation, weight, createdAt: now, updatedAt: now }
  },

  deleteCard: async (_, { userId, deckId, cardId }, { dynamodb }) => {
    await getDeckOrThrow(dynamodb, deckId, userId)
    await getCardOrThrow(dynamodb, deckId, cardId)

    await dynamodb.send(
      new DeleteCommand({
        TableName: 'sanakortit-cards',
        Key: { deckId, cardId },
      }),
    )

    return cardId
  },

  markCardDifficulty: async (_, { userId, deckId, cardId, weight }, { dynamodb }) => {
    await getDeckOrThrow(dynamodb, deckId, userId)
    const existing = await getCardOrThrow(dynamodb, deckId, cardId)

    const updatedAt = new Date().toISOString()

    await dynamodb.send(
      new UpdateCommand({
        TableName: 'sanakortit-cards',
        Key: { deckId, cardId },
        UpdateExpression: 'SET weight = :weight, updatedAt = :updatedAt',
        ExpressionAttributeValues: { ':weight': weight, ':updatedAt': updatedAt },
      }),
    )

    return {
      cardId,
      deckId,
      text: existing.text as string,
      textTranslation: existing.textTranslation as string,
      weight,
      createdAt: existing.createdAt as string,
      updatedAt,
    }
  },

  updateCard: async (_, { userId, deckId, cardId, text, textTranslation }, { dynamodb }) => {
    await getDeckOrThrow(dynamodb, deckId, userId)
    const existing = await getCardOrThrow(dynamodb, deckId, cardId)

    const updatedAt = new Date().toISOString()

    await dynamodb.send(
      new UpdateCommand({
        TableName: 'sanakortit-cards',
        Key: { deckId, cardId },
        UpdateExpression: 'SET #text = :text, textTranslation = :textTranslation, updatedAt = :updatedAt',
        ExpressionAttributeNames: { '#text': 'text' },
        ExpressionAttributeValues: { ':text': text, ':textTranslation': textTranslation, ':updatedAt': updatedAt },
      }),
    )

    return {
      cardId,
      deckId,
      text,
      textTranslation,
      weight: existing.weight as number,
      createdAt: existing.createdAt as string,
      updatedAt,
    }
  },
}

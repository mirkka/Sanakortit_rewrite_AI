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
      TableName: process.env.CARDS_TABLE_NAME!,
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

    const items: Array<{ cardId: string; deckId: string; text: string; textTranslation: string; weight: number }> = []
    let lastKey: Record<string, unknown> | undefined

    do {
      const result = await dynamodb.send(
        new QueryCommand({
          TableName: process.env.CARDS_TABLE_NAME!,
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

export const cardMutationResolvers: Pick<MutationResolvers, 'addCard' | 'deleteCard' | 'updateCard'> = {
  addCard: async (_, { userId, deckId, text, textTranslation }, { dynamodb }) => {
    await getDeckOrThrow(dynamodb, deckId, userId)

    const cardId = uuidv4()
    const weight = DEFAULT_WEIGHT

    await dynamodb.send(
      new PutCommand({
        TableName: process.env.CARDS_TABLE_NAME!,
        Item: { deckId, cardId, text, textTranslation, weight },
      }),
    )

    return { cardId, deckId, text, textTranslation, weight }
  },

  deleteCard: async (_, { userId, deckId, cardId }, { dynamodb }) => {
    await getDeckOrThrow(dynamodb, deckId, userId)
    await getCardOrThrow(dynamodb, deckId, cardId)

    await dynamodb.send(
      new DeleteCommand({
        TableName: process.env.CARDS_TABLE_NAME!,
        Key: { deckId, cardId },
      }),
    )

    return cardId
  },

  updateCard: async (_, { userId, deckId, cardId, text, textTranslation }, { dynamodb }) => {
    await getDeckOrThrow(dynamodb, deckId, userId)
    const existing = await getCardOrThrow(dynamodb, deckId, cardId)

    await dynamodb.send(
      new UpdateCommand({
        TableName: process.env.CARDS_TABLE_NAME!,
        Key: { deckId, cardId },
        UpdateExpression: 'SET #text = :text, textTranslation = :textTranslation',
        ExpressionAttributeNames: { '#text': 'text' },
        ExpressionAttributeValues: { ':text': text, ':textTranslation': textTranslation },
      }),
    )

    return { cardId, deckId, text, textTranslation, weight: existing.weight as number }
  },
}

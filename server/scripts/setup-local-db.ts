import {
  CreateTableCommand,
  DynamoDBClient,
  ResourceInUseException,
} from '@aws-sdk/client-dynamodb'
import { TABLE_NAMES } from '../lib/sanakortit-stack'

const client = new DynamoDBClient({
  endpoint: 'http://localhost:8000',
  region: 'eu-west-1',
  credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
})

const createDecksTable = async () => {
  try {
    await client.send(
      new CreateTableCommand({
        TableName: TABLE_NAMES.DECKS,
        KeySchema: [{ AttributeName: 'deckId', KeyType: 'HASH' }],
        AttributeDefinitions: [
          { AttributeName: 'deckId', AttributeType: 'S' },
          { AttributeName: 'userId', AttributeType: 'S' },
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: 'userId-index',
            KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
            Projection: { ProjectionType: 'ALL' },
          },
        ],
        BillingMode: 'PAY_PER_REQUEST',
      }),
    )
    console.log(`Created table: ${TABLE_NAMES.DECKS}`)
  } catch (err) {
    if (err instanceof ResourceInUseException) {
      console.log(`Table already exists: ${TABLE_NAMES.DECKS}`)
    } else {
      throw err
    }
  }
}

const createCardsTable = async () => {
  try {
    await client.send(
      new CreateTableCommand({
        TableName: TABLE_NAMES.CARDS,
        KeySchema: [
          { AttributeName: 'deckId', KeyType: 'HASH' },
          { AttributeName: 'cardId', KeyType: 'RANGE' },
        ],
        AttributeDefinitions: [
          { AttributeName: 'deckId', AttributeType: 'S' },
          { AttributeName: 'cardId', AttributeType: 'S' },
        ],
        BillingMode: 'PAY_PER_REQUEST',
      }),
    )
    console.log(`Created table: ${TABLE_NAMES.CARDS}`)
  } catch (err) {
    if (err instanceof ResourceInUseException) {
      console.log(`Table already exists: ${TABLE_NAMES.CARDS}`)
    } else {
      throw err
    }
  }
}

const run = async () => {
  await createDecksTable()
  await createCardsTable()
  console.log('Local DB setup complete.')
}

run().catch(console.error)

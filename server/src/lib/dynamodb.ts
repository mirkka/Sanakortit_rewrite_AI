import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const endpoint = process.env.DYNAMODB_ENDPOINT

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? 'eu-west-1',
  ...(endpoint && {
    endpoint,
    credentials: {
      accessKeyId: 'local',
      secretAccessKey: 'local',
    },
  }),
})

export const dynamodb = DynamoDBDocumentClient.from(client)

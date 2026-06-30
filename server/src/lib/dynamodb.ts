import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const isLocal = process.env.AWS_SAM_LOCAL === 'true'

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? 'eu-west-1',
  ...(isLocal && {
    endpoint: 'http://host.docker.internal:8000',
    credentials: {
      accessKeyId: 'local',
      secretAccessKey: 'local',
    },
  }),
})

export const dynamodb = DynamoDBDocumentClient.from(client)

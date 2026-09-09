import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { GraphQLError } from 'graphql'
import { ExpressContextFunctionArgument } from '@as-integrations/express4'
import { dynamodb } from './lib/dynamodb'

export interface GraphQLContext {
  dynamodb: DynamoDBDocumentClient
  userId: string
}

// Only used locally, where SAM's API Gateway emulation doesn't run a real Cognito authorizer.
const LOCAL_DEV_USER_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

export const createContext = async ({ req }: ExpressContextFunctionArgument): Promise<GraphQLContext> => {
  const sub = req.event?.requestContext?.authorizer?.claims?.sub

  if (sub) return { dynamodb, userId: sub }

  if (process.env.DYNAMODB_ENDPOINT) {
    return { dynamodb, userId: LOCAL_DEV_USER_ID }
  }

  throw new GraphQLError('Unauthenticated', { extensions: { code: 'UNAUTHENTICATED' } })
}

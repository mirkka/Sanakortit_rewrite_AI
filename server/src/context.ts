import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { dynamodb } from './lib/dynamodb'

export interface GraphQLContext {
  dynamodb: DynamoDBDocumentClient
}

export const createContext = async (): Promise<GraphQLContext> => ({
  dynamodb,
})

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express4'
import { Handler } from 'aws-lambda'
import cors from 'cors'
import express from 'express'
import serverlessHttp from 'serverless-http'
import { createContext, GraphQLContext } from '../context'
import { typeDefs, resolvers } from './schema'

const app = express()
const server = new ApolloServer<GraphQLContext>({ typeDefs, resolvers })
const serverlessApp = serverlessHttp(app)

let initialized = false

const init = async () => {
  if (initialized) return
  await server.start()
  app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server, { context: createContext }))
  initialized = true
}

export const handler: Handler = async (event, context) => {
  await init()
  return serverlessApp(event, context)
}

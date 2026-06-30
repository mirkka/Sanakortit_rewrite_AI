import typeDefs from './schema.graphql'
import type { Resolvers } from '../generated/resolvers'

export { typeDefs }

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'Hello from Sanakortit!',
  },
}

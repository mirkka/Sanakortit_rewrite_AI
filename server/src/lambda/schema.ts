import typeDefs from './schema.graphql'
import type { Resolvers } from '../generated/resolvers'
import { cardMutationResolvers, cardQueryResolvers } from '../resolvers/card'
import { deckMutationResolvers, deckQueryResolvers } from '../resolvers/deck'

export { typeDefs }

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'Hello from Sanakortit!',
    ...deckQueryResolvers,
    ...cardQueryResolvers,
  },
  Mutation: {
    ...deckMutationResolvers,
    ...cardMutationResolvers,
  },
}

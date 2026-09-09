import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { ErrorLink } from '@apollo/client/link/error'
import { SetContextLink } from '@apollo/client/link/context'
import { clearTokens, getValidTokens } from '../auth/tokenStorage'
import { store } from '../store'
import { setSignedOut } from '../store/authSlice'

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL ?? 'http://localhost:4000/graphql',
})

const authLink = new SetContextLink((previousContext) => {
  const tokens = getValidTokens()
  if (!tokens) return previousContext

  return {
    ...previousContext,
    headers: {
      ...previousContext.headers,
      Authorization: `Bearer ${tokens.idToken}`,
    },
  }
})

const errorLink = new ErrorLink(({ error }) => {
  const isUnauthenticated =
    CombinedGraphQLErrors.is(error) && error.errors.some((e) => e.extensions?.code === 'UNAUTHENTICATED')

  if (isUnauthenticated) {
    clearTokens()
    store.dispatch(setSignedOut())
    window.location.href = `${process.env.BASENAME}/sign-in`
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
    },
  },
})

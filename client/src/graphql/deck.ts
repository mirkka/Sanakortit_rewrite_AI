import { graphql } from '../generated/gql'

export const GET_DECKS = graphql(`
  query GetDecks($userId: ID!) {
    getDecks(userId: $userId) {
      deckId
      name
      userId
      numberOfCards
      lastStudied
      status
      createdAt
      updatedAt
    }
  }
`)

export const RESET_DECK = graphql(`
  mutation ResetDeck($userId: ID!, $deckId: ID!) {
    resetDeck(userId: $userId, deckId: $deckId) {
      deckId
      status
    }
  }
`)

export const UPDATE_DECK = graphql(`
  mutation UpdateDeck($userId: ID!, $deckId: ID!, $name: String!) {
    updateDeck(userId: $userId, deckId: $deckId, name: $name) {
      deckId
      name
      userId
      numberOfCards
      lastStudied
      createdAt
      updatedAt
    }
  }
`)

export const CREATE_DECK = graphql(`
  mutation CreateDeck($userId: ID!, $name: String!) {
    createDeck(userId: $userId, name: $name) {
      deckId
      name
      userId
      numberOfCards
      lastStudied
      createdAt
      updatedAt
    }
  }
`)

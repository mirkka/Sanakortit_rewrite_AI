import { graphql } from '../generated/gql'

export const GET_DECKS = graphql(`
  query GetDecks {
    getDecks {
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
  mutation ResetDeck($deckId: ID!) {
    resetDeck(deckId: $deckId) {
      deckId
      status
    }
  }
`)

export const UPDATE_DECK = graphql(`
  mutation UpdateDeck($deckId: ID!, $name: String!) {
    updateDeck(deckId: $deckId, name: $name) {
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

export const DELETE_DECK = graphql(`
  mutation DeleteDeck($deckId: ID!) {
    deleteDeck(deckId: $deckId)
  }
`)

export const CREATE_DECK = graphql(`
  mutation CreateDeck($name: String!) {
    createDeck(name: $name) {
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

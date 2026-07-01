import { graphql } from '../generated/gql'

export const ADD_CARD = graphql(`
  mutation AddCard($userId: ID!, $deckId: ID!, $text: String!, $textTranslation: String!) {
    addCard(userId: $userId, deckId: $deckId, text: $text, textTranslation: $textTranslation) {
      cardId
      deckId
      text
      textTranslation
      weight
      createdAt
      updatedAt
    }
  }
`)

export const GET_CARDS_FOR_DECK = graphql(`
  query GetCardsForDeck($userId: ID!, $deckId: ID!) {
    getCardsForDeck(userId: $userId, deckId: $deckId) {
      cardId
      deckId
      text
      textTranslation
      weight
      createdAt
      updatedAt
    }
  }
`)

export const UPDATE_CARD = graphql(`
  mutation UpdateCard($userId: ID!, $deckId: ID!, $cardId: ID!, $text: String!, $textTranslation: String!) {
    updateCard(userId: $userId, deckId: $deckId, cardId: $cardId, text: $text, textTranslation: $textTranslation) {
      cardId
      deckId
      text
      textTranslation
      weight
      createdAt
      updatedAt
    }
  }
`)

export const MARK_CARD_DIFFICULTY = graphql(`
  mutation MarkCardDifficulty($userId: ID!, $deckId: ID!, $cardId: ID!, $weight: Int!) {
    markCardDifficulty(userId: $userId, deckId: $deckId, cardId: $cardId, weight: $weight) {
      cardId
      updatedAt
    }
  }
`)

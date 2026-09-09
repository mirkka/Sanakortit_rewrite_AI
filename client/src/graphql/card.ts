import { graphql } from '../generated/gql'

export const ADD_CARD = graphql(`
  mutation AddCard($deckId: ID!, $text: String!, $textTranslation: String!) {
    addCard(deckId: $deckId, text: $text, textTranslation: $textTranslation) {
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
  query GetCardsForDeck($deckId: ID!) {
    getCardsForDeck(deckId: $deckId) {
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
  mutation UpdateCard($deckId: ID!, $cardId: ID!, $text: String!, $textTranslation: String!) {
    updateCard(deckId: $deckId, cardId: $cardId, text: $text, textTranslation: $textTranslation) {
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
  mutation MarkCardDifficulty($deckId: ID!, $cardId: ID!, $weight: Int!) {
    markCardDifficulty(deckId: $deckId, cardId: $cardId, weight: $weight) {
      cardId
      updatedAt
    }
  }
`)

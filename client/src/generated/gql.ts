/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation AddCard($userId: ID!, $deckId: ID!, $text: String!, $textTranslation: String!) {\n    addCard(userId: $userId, deckId: $deckId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AddCardDocument,
    "\n  query GetCardsForDeck($userId: ID!, $deckId: ID!) {\n    getCardsForDeck(userId: $userId, deckId: $deckId) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCardsForDeckDocument,
    "\n  mutation UpdateCard($userId: ID!, $deckId: ID!, $cardId: ID!, $text: String!, $textTranslation: String!) {\n    updateCard(userId: $userId, deckId: $deckId, cardId: $cardId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateCardDocument,
    "\n  mutation MarkCardDifficulty($userId: ID!, $deckId: ID!, $cardId: ID!, $weight: Int!) {\n    markCardDifficulty(userId: $userId, deckId: $deckId, cardId: $cardId, weight: $weight) {\n      cardId\n      updatedAt\n    }\n  }\n": typeof types.MarkCardDifficultyDocument,
    "\n  query GetDecks($userId: ID!) {\n    getDecks(userId: $userId) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      status\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetDecksDocument,
    "\n  mutation ResetDeck($userId: ID!, $deckId: ID!) {\n    resetDeck(userId: $userId, deckId: $deckId) {\n      deckId\n      status\n    }\n  }\n": typeof types.ResetDeckDocument,
    "\n  mutation UpdateDeck($userId: ID!, $deckId: ID!, $name: String!) {\n    updateDeck(userId: $userId, deckId: $deckId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateDeckDocument,
    "\n  mutation CreateDeck($userId: ID!, $name: String!) {\n    createDeck(userId: $userId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateDeckDocument,
};
const documents: Documents = {
    "\n  mutation AddCard($userId: ID!, $deckId: ID!, $text: String!, $textTranslation: String!) {\n    addCard(userId: $userId, deckId: $deckId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": types.AddCardDocument,
    "\n  query GetCardsForDeck($userId: ID!, $deckId: ID!) {\n    getCardsForDeck(userId: $userId, deckId: $deckId) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCardsForDeckDocument,
    "\n  mutation UpdateCard($userId: ID!, $deckId: ID!, $cardId: ID!, $text: String!, $textTranslation: String!) {\n    updateCard(userId: $userId, deckId: $deckId, cardId: $cardId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateCardDocument,
    "\n  mutation MarkCardDifficulty($userId: ID!, $deckId: ID!, $cardId: ID!, $weight: Int!) {\n    markCardDifficulty(userId: $userId, deckId: $deckId, cardId: $cardId, weight: $weight) {\n      cardId\n      updatedAt\n    }\n  }\n": types.MarkCardDifficultyDocument,
    "\n  query GetDecks($userId: ID!) {\n    getDecks(userId: $userId) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      status\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetDecksDocument,
    "\n  mutation ResetDeck($userId: ID!, $deckId: ID!) {\n    resetDeck(userId: $userId, deckId: $deckId) {\n      deckId\n      status\n    }\n  }\n": types.ResetDeckDocument,
    "\n  mutation UpdateDeck($userId: ID!, $deckId: ID!, $name: String!) {\n    updateDeck(userId: $userId, deckId: $deckId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateDeckDocument,
    "\n  mutation CreateDeck($userId: ID!, $name: String!) {\n    createDeck(userId: $userId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateDeckDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddCard($userId: ID!, $deckId: ID!, $text: String!, $textTranslation: String!) {\n    addCard(userId: $userId, deckId: $deckId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation AddCard($userId: ID!, $deckId: ID!, $text: String!, $textTranslation: String!) {\n    addCard(userId: $userId, deckId: $deckId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCardsForDeck($userId: ID!, $deckId: ID!) {\n    getCardsForDeck(userId: $userId, deckId: $deckId) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetCardsForDeck($userId: ID!, $deckId: ID!) {\n    getCardsForDeck(userId: $userId, deckId: $deckId) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCard($userId: ID!, $deckId: ID!, $cardId: ID!, $text: String!, $textTranslation: String!) {\n    updateCard(userId: $userId, deckId: $deckId, cardId: $cardId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCard($userId: ID!, $deckId: ID!, $cardId: ID!, $text: String!, $textTranslation: String!) {\n    updateCard(userId: $userId, deckId: $deckId, cardId: $cardId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MarkCardDifficulty($userId: ID!, $deckId: ID!, $cardId: ID!, $weight: Int!) {\n    markCardDifficulty(userId: $userId, deckId: $deckId, cardId: $cardId, weight: $weight) {\n      cardId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation MarkCardDifficulty($userId: ID!, $deckId: ID!, $cardId: ID!, $weight: Int!) {\n    markCardDifficulty(userId: $userId, deckId: $deckId, cardId: $cardId, weight: $weight) {\n      cardId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDecks($userId: ID!) {\n    getDecks(userId: $userId) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetDecks($userId: ID!) {\n    getDecks(userId: $userId) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetDeck($userId: ID!, $deckId: ID!) {\n    resetDeck(userId: $userId, deckId: $deckId) {\n      deckId\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation ResetDeck($userId: ID!, $deckId: ID!) {\n    resetDeck(userId: $userId, deckId: $deckId) {\n      deckId\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDeck($userId: ID!, $deckId: ID!, $name: String!) {\n    updateDeck(userId: $userId, deckId: $deckId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDeck($userId: ID!, $deckId: ID!, $name: String!) {\n    updateDeck(userId: $userId, deckId: $deckId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDeck($userId: ID!, $name: String!) {\n    createDeck(userId: $userId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDeck($userId: ID!, $name: String!) {\n    createDeck(userId: $userId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
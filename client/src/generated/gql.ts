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
    "\n  mutation AddCard($deckId: ID!, $text: String!, $textTranslation: String!) {\n    addCard(deckId: $deckId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AddCardDocument,
    "\n  query GetCardsForDeck($deckId: ID!) {\n    getCardsForDeck(deckId: $deckId) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCardsForDeckDocument,
    "\n  mutation UpdateCard($deckId: ID!, $cardId: ID!, $text: String!, $textTranslation: String!) {\n    updateCard(deckId: $deckId, cardId: $cardId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateCardDocument,
    "\n  mutation MarkCardDifficulty($deckId: ID!, $cardId: ID!, $weight: Int!) {\n    markCardDifficulty(deckId: $deckId, cardId: $cardId, weight: $weight) {\n      cardId\n      updatedAt\n    }\n  }\n": typeof types.MarkCardDifficultyDocument,
    "\n  query GetDecks {\n    getDecks {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      status\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetDecksDocument,
    "\n  mutation ResetDeck($deckId: ID!) {\n    resetDeck(deckId: $deckId) {\n      deckId\n      status\n    }\n  }\n": typeof types.ResetDeckDocument,
    "\n  mutation UpdateDeck($deckId: ID!, $name: String!) {\n    updateDeck(deckId: $deckId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateDeckDocument,
    "\n  mutation DeleteDeck($deckId: ID!) {\n    deleteDeck(deckId: $deckId)\n  }\n": typeof types.DeleteDeckDocument,
    "\n  mutation CreateDeck($name: String!) {\n    createDeck(name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateDeckDocument,
};
const documents: Documents = {
    "\n  mutation AddCard($deckId: ID!, $text: String!, $textTranslation: String!) {\n    addCard(deckId: $deckId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": types.AddCardDocument,
    "\n  query GetCardsForDeck($deckId: ID!) {\n    getCardsForDeck(deckId: $deckId) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCardsForDeckDocument,
    "\n  mutation UpdateCard($deckId: ID!, $cardId: ID!, $text: String!, $textTranslation: String!) {\n    updateCard(deckId: $deckId, cardId: $cardId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateCardDocument,
    "\n  mutation MarkCardDifficulty($deckId: ID!, $cardId: ID!, $weight: Int!) {\n    markCardDifficulty(deckId: $deckId, cardId: $cardId, weight: $weight) {\n      cardId\n      updatedAt\n    }\n  }\n": types.MarkCardDifficultyDocument,
    "\n  query GetDecks {\n    getDecks {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      status\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetDecksDocument,
    "\n  mutation ResetDeck($deckId: ID!) {\n    resetDeck(deckId: $deckId) {\n      deckId\n      status\n    }\n  }\n": types.ResetDeckDocument,
    "\n  mutation UpdateDeck($deckId: ID!, $name: String!) {\n    updateDeck(deckId: $deckId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateDeckDocument,
    "\n  mutation DeleteDeck($deckId: ID!) {\n    deleteDeck(deckId: $deckId)\n  }\n": types.DeleteDeckDocument,
    "\n  mutation CreateDeck($name: String!) {\n    createDeck(name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateDeckDocument,
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
export function graphql(source: "\n  mutation AddCard($deckId: ID!, $text: String!, $textTranslation: String!) {\n    addCard(deckId: $deckId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation AddCard($deckId: ID!, $text: String!, $textTranslation: String!) {\n    addCard(deckId: $deckId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCardsForDeck($deckId: ID!) {\n    getCardsForDeck(deckId: $deckId) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetCardsForDeck($deckId: ID!) {\n    getCardsForDeck(deckId: $deckId) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCard($deckId: ID!, $cardId: ID!, $text: String!, $textTranslation: String!) {\n    updateCard(deckId: $deckId, cardId: $cardId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCard($deckId: ID!, $cardId: ID!, $text: String!, $textTranslation: String!) {\n    updateCard(deckId: $deckId, cardId: $cardId, text: $text, textTranslation: $textTranslation) {\n      cardId\n      deckId\n      text\n      textTranslation\n      weight\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MarkCardDifficulty($deckId: ID!, $cardId: ID!, $weight: Int!) {\n    markCardDifficulty(deckId: $deckId, cardId: $cardId, weight: $weight) {\n      cardId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation MarkCardDifficulty($deckId: ID!, $cardId: ID!, $weight: Int!) {\n    markCardDifficulty(deckId: $deckId, cardId: $cardId, weight: $weight) {\n      cardId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDecks {\n    getDecks {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetDecks {\n    getDecks {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetDeck($deckId: ID!) {\n    resetDeck(deckId: $deckId) {\n      deckId\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation ResetDeck($deckId: ID!) {\n    resetDeck(deckId: $deckId) {\n      deckId\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDeck($deckId: ID!, $name: String!) {\n    updateDeck(deckId: $deckId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDeck($deckId: ID!, $name: String!) {\n    updateDeck(deckId: $deckId, name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteDeck($deckId: ID!) {\n    deleteDeck(deckId: $deckId)\n  }\n"): (typeof documents)["\n  mutation DeleteDeck($deckId: ID!) {\n    deleteDeck(deckId: $deckId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDeck($name: String!) {\n    createDeck(name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDeck($name: String!) {\n    createDeck(name: $name) {\n      deckId\n      name\n      userId\n      numberOfCards\n      lastStudied\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
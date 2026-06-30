import { GraphQLResolveInfo } from 'graphql';
import { GraphQLContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Card = {
  __typename?: 'Card';
  cardId: Scalars['ID']['output'];
  deckId: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  textTranslation: Scalars['String']['output'];
  weight: Scalars['Int']['output'];
};

export type Deck = {
  __typename?: 'Deck';
  deckId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCard: Card;
  createDeck: Deck;
  deleteCard: Scalars['ID']['output'];
  deleteDeck: Scalars['ID']['output'];
  updateCard: Card;
};


export type MutationAddCardArgs = {
  deckId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  textTranslation: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateDeckArgs = {
  name: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteCardArgs = {
  cardId: Scalars['ID']['input'];
  deckId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteDeckArgs = {
  deckId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateCardArgs = {
  cardId: Scalars['ID']['input'];
  deckId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  textTranslation: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getCardsForDeck: Array<Card>;
  getDeck: Deck;
  getDecks: Array<Deck>;
  hello?: Maybe<Scalars['String']['output']>;
};


export type QueryGetCardsForDeckArgs = {
  deckId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryGetDeckArgs = {
  deckId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryGetDecksArgs = {
  userId: Scalars['ID']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Card: ResolverTypeWrapper<Card>;
  Deck: ResolverTypeWrapper<Deck>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Card: Card;
  Deck: Deck;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
};

export type CardResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = {
  cardId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  deckId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  textTranslation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type DeckResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Deck'] = ResolversParentTypes['Deck']> = {
  deckId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addCard?: Resolver<ResolversTypes['Card'], ParentType, ContextType, RequireFields<MutationAddCardArgs, 'deckId' | 'text' | 'textTranslation' | 'userId'>>;
  createDeck?: Resolver<ResolversTypes['Deck'], ParentType, ContextType, RequireFields<MutationCreateDeckArgs, 'name' | 'userId'>>;
  deleteCard?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteCardArgs, 'cardId' | 'deckId' | 'userId'>>;
  deleteDeck?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteDeckArgs, 'deckId' | 'userId'>>;
  updateCard?: Resolver<ResolversTypes['Card'], ParentType, ContextType, RequireFields<MutationUpdateCardArgs, 'cardId' | 'deckId' | 'text' | 'textTranslation' | 'userId'>>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCardsForDeck?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryGetCardsForDeckArgs, 'deckId' | 'userId'>>;
  getDeck?: Resolver<ResolversTypes['Deck'], ParentType, ContextType, RequireFields<QueryGetDeckArgs, 'deckId' | 'userId'>>;
  getDecks?: Resolver<Array<ResolversTypes['Deck']>, ParentType, ContextType, RequireFields<QueryGetDecksArgs, 'userId'>>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Card?: CardResolvers<ContextType>;
  Deck?: DeckResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


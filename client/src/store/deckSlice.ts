import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'

export interface Deck {
  deckId: string
  name: string
  userId: string
  numberOfCards: number
  lastStudied: string | null
  status: string | null
  createdAt: string
  updatedAt: string
}

interface DeckState {
  decks: Deck[]
}

const initialState: DeckState = {
  decks: [],
}

const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    setDecks: (state, action: PayloadAction<Deck[]>) => {
      state.decks = action.payload
    },
  },
})

export const { setDecks } = deckSlice.actions

export const selectDecks = (state: RootState) => state.deck.decks

export default deckSlice.reducer

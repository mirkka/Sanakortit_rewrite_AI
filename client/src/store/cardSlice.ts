import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

export interface Card {
  cardId: string
  deckId: string
  text: string
  textTranslation: string
  weight: number
  createdAt: string
  updatedAt: string
}

interface CardState {
  cards: Card[]
}

const initialState: CardState = { cards: [] }

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload
    },
    updateCardWeight: (state, action: PayloadAction<{ cardId: string; weight: number }>) => {
      const card = state.cards.find((c) => c.cardId === action.payload.cardId)
      if (card) card.weight = action.payload.weight
    },
  },
})

export const { setCards, updateCardWeight } = cardSlice.actions
export const selectCards = (state: RootState) => state.card.cards
export default cardSlice.reducer

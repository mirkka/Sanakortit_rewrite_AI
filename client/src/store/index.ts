import { configureStore } from '@reduxjs/toolkit'
import cardReducer from './cardSlice'
import deckReducer from './deckSlice'
import studyReducer from './studySlice'

export const store = configureStore({
  reducer: {
    deck: deckReducer,
    card: cardReducer,
    study: studyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

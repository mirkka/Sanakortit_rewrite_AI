import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { Card } from './cardSlice'

interface StudyState {
  currentCard: Card | null
  isFlipped: boolean
}

const initialState: StudyState = { currentCard: null, isFlipped: false }

const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    setCurrentCard: (state, action: PayloadAction<Card>) => {
      state.currentCard = action.payload
      state.isFlipped = false
    },
    flipCard: (state) => {
      state.isFlipped = true
    },
    resetStudy: () => initialState,
  },
})

export const { setCurrentCard, flipCard, resetStudy } = studySlice.actions
export const selectCurrentCard = (state: RootState) => state.study.currentCard
export const selectIsFlipped = (state: RootState) => state.study.isFlipped
export default studySlice.reducer

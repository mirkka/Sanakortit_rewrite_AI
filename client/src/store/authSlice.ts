import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { decodeIdToken } from '../auth/cognito'
import { getValidTokens } from '../auth/tokenStorage'

interface AuthState {
  isAuthenticated: boolean
  email: string | null
}

const getInitialState = (): AuthState => {
  const tokens = getValidTokens()
  if (!tokens) return { isAuthenticated: false, email: null }

  return { isAuthenticated: true, email: decodeIdToken(tokens.idToken).email ?? null }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setAuthenticated: (state, action: PayloadAction<string | undefined>) => {
      state.isAuthenticated = true
      state.email = action.payload ?? null
    },
    setSignedOut: (state) => {
      state.isAuthenticated = false
      state.email = null
    },
  },
})

export const { setAuthenticated, setSignedOut } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectEmail = (state: RootState) => state.auth.email

export default authSlice.reducer

import { buildGoogleAuthorizeUrl, buildLogoutUrl, decodeIdToken, exchangeCodeForTokens } from '../auth/cognito'
import { clearTokens, saveTokens } from '../auth/tokenStorage'

export const signInWithGoogle = async (): Promise<void> => {
  window.location.href = await buildGoogleAuthorizeUrl()
}

export const completeSignIn = async (code: string, state: string): Promise<string | undefined> => {
  const tokens = await exchangeCodeForTokens(code, state)
  saveTokens(tokens)
  return decodeIdToken(tokens.id_token).email
}

export const signOut = (): void => {
  clearTokens()
  window.location.href = buildLogoutUrl()
}

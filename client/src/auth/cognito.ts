import { generateVerifier, generateState, deriveChallenge } from './pkce'

const VERIFIER_KEY = 'sanakortit_pkce_verifier'
const STATE_KEY = 'sanakortit_pkce_state'

const domain = process.env.COGNITO_DOMAIN
const clientId = process.env.COGNITO_CLIENT_ID

export const getRedirectUri = (): string => `${window.location.origin}${process.env.BASENAME}/`

export const buildGoogleAuthorizeUrl = async (): Promise<string> => {
  const verifier = generateVerifier()
  const state = generateState()
  const challenge = await deriveChallenge(verifier)

  sessionStorage.setItem(VERIFIER_KEY, verifier)
  sessionStorage.setItem(STATE_KEY, state)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId ?? '',
    redirect_uri: getRedirectUri(),
    identity_provider: 'Google',
    scope: 'openid email profile',
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  })

  return `${domain}/oauth2/authorize?${params.toString()}`
}

export interface TokenResponse {
  id_token: string
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
}

export const exchangeCodeForTokens = async (code: string, state: string): Promise<TokenResponse> => {
  const expectedState = sessionStorage.getItem(STATE_KEY)
  const verifier = sessionStorage.getItem(VERIFIER_KEY)
  sessionStorage.removeItem(STATE_KEY)
  sessionStorage.removeItem(VERIFIER_KEY)

  if (!verifier || !expectedState || state !== expectedState) {
    throw new Error('Invalid OAuth state')
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId ?? '',
    code,
    redirect_uri: getRedirectUri(),
    code_verifier: verifier,
  })

  const response = await fetch(`${domain}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!response.ok) {
    throw new Error('Token exchange failed')
  }

  return response.json()
}

export const decodeIdToken = (idToken: string): { email?: string } => {
  const payload = idToken.split('.')[1]
  const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(atob(normalized))
}

export const buildLogoutUrl = (): string => {
  const params = new URLSearchParams({
    client_id: clientId ?? '',
    logout_uri: getRedirectUri(),
  })
  return `${domain}/logout?${params.toString()}`
}

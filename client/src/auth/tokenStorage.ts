const STORAGE_KEY = 'sanakortit_auth_tokens'

export interface StoredTokens {
  idToken: string
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export const saveTokens = (tokens: {
  id_token: string
  access_token: string
  refresh_token: string
  expires_in: number
}): void => {
  const stored: StoredTokens = {
    idToken: tokens.id_token,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresAt: Date.now() + tokens.expires_in * 1000,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
}

export const getValidTokens = (): StoredTokens | null => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    const stored = JSON.parse(raw) as StoredTokens
    if (Date.now() >= stored.expiresAt) return null
    return stored
  } catch {
    return null
  }
}

export const clearTokens = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}

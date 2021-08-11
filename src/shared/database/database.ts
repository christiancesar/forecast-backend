import { v4 as uuid } from "uuid";

interface User {
  id: string;
  name: string;
  email: string
  password: string
}

type RefreshToken = Map<string, string[]>
export const tokens: RefreshToken = new Map();

export const users: User[] = [{
  id: '065fe452-b98e-4d2d-bdb1-0c714b6a3911',
  name: 'Christian Cesar',
  email: 'christian.cesar@gmail.com',
  password: '123456'
}];

export function createRefreshToken(email: string) {
  const currentUserTokens = tokens.get(email) ?? []
  const refreshToken = uuid()

  tokens.set(email, [...currentUserTokens, refreshToken])

  return refreshToken;
}

export function checkRefreshTokenIsValid(email: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(email) ?? []

  return storedRefreshTokens.some(token => token === refreshToken)
}

export function invalidateRefreshToken(email: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(email) ?? []

  tokens.set(email, storedRefreshTokens.filter(token => token !== refreshToken));
}

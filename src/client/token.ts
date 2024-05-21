const AUTH_TOKEN_KEY_NAME = 'fitfriends-token';
const REFRESH_TOKEN_KEY_NAME = 'fitfriends-token';

export type Tokens = {
  authToken: string;
  refreshToken: string;
};

export const getToken = (): Tokens => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  const tokens: Tokens = { authToken, refreshToken };
  return tokens ?? '';
};

export const saveTokens = (tokens: Tokens): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, tokens.authToken);
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, tokens.refreshToken);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

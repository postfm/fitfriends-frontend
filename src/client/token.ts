export const AUTH_TOKEN_KEY_NAME = 'access-token';
export const REFRESH_TOKEN_KEY_NAME = 'refresh-token';
export const USER_KEY_NAME = 'user';

export type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

export const getToken = (): Tokens => {
  const accessToken = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return { accessToken, refreshToken };
};

export const saveTokens = ({ accessToken, refreshToken }: Tokens): void => {
  if (accessToken) {
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY_NAME, refreshToken);
  }
};

export const clearTokens = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};

export const clearUser = (): void => {
  localStorage.removeItem(USER_KEY_NAME);
};

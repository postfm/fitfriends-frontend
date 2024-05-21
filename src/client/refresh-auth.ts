import { AxiosError } from 'axios';
import { client } from './client';
import { Tokens, clearTokens, getToken, saveTokens, clearUser } from './token';
import { AppRoutes } from '../constants/constants';

export const fetchNewToken = async () => {
  const refreshToken = getToken().refreshToken;
  try {
    const token = await client.get<Tokens>('auth/refresh', {
      headers: {
        Authorization: refreshToken ? `Bearer ${refreshToken}` : undefined,
      },
    });
    return token;
  } catch (error) {
    return null;
  }
};

export const refreshAuth = async (failedRequest: AxiosError) => {
  const newTokens = await fetchNewToken();

  if (
    newTokens?.data.accessToken &&
    newTokens?.data.refreshToken &&
    failedRequest.response
  ) {
    failedRequest.response.config.headers.Authorization = `Bearer ${newTokens.data.accessToken}`;
    saveTokens(newTokens.data);
    return Promise.resolve(newTokens);
  } else {
    clearTokens();
    clearUser();
    window.location.replace(AppRoutes.Login);
  }
};

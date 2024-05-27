import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { getToken } from './token';
import { refreshAuth } from './refresh-auth';

const resolveBaseUrl = () => {
  const { VITE_API_BASE_URL, VITE_API_PREFIX } = process.env;

  if (!VITE_API_BASE_URL || !VITE_API_PREFIX) {
    throw new Error('Env variables for API URL host are missing');
  }

  return `${VITE_API_BASE_URL}/${VITE_API_PREFIX}`;
};

const TIMEOUT = 5000;

export const client = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: TIMEOUT,
});

export const setHeaderToken = (token: string) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  delete client.defaults.headers.common.Authorization;
};

const accessToken = getToken().accessToken;

if (accessToken) {
  setHeaderToken(accessToken);
}

createAuthRefreshInterceptor(client, refreshAuth, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

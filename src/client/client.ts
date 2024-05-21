import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { getToken } from './token';
import { refreshAuth } from './refresh-auth';

const BASE_URL = 'http://localhost:4000/fitfriends';
const TIMEOUT = 5000;

export const client = axios.create({
  baseURL: BASE_URL,
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

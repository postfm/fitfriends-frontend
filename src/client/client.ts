import axios from 'axios';
import { getToken } from './token';

const BASE_URL = 'http://localhost:4000/fitfriends';
const TIMEOUT = 5000;

export const client = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

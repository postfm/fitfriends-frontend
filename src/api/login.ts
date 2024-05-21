import { client } from '../client/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function login(email: string, password: string) {
  return client.post('auth/login', { email: email, password: password });
}

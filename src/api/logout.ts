import { client } from '../client/client';

export function logout() {
  return client.get<null>('auth/logout');
}

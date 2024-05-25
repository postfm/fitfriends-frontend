import { client } from '../client/client';
import { User } from '../types';

export function loadUser(id: number) {
  return client.get<User>(`users/${id}`);
}

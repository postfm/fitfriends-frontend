import { client } from '../client/client';
import { NewUser, User } from '../types';

export function updateUser(user: NewUser, id: number) {
  return client.patch<User>(`users/${id}`, user);
}

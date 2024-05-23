import { client } from '../client/client';
import { User } from '../types';

export function loadFriendsUser() {
  return client.get<User[]>('friends');
}

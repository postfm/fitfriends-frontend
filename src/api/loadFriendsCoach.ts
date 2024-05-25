import { client } from '../client/client';
import { User } from '../types';

export function loadFriendsCoach() {
  return client.get<User[]>('friends/trainer');
}

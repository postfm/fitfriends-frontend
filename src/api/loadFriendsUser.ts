import { FRIENDS } from '../mocks/friends.mocks';
import { User } from '../types';

export function loadFriendsUser(): Promise<User[]> {
  return Promise.resolve(FRIENDS);
}

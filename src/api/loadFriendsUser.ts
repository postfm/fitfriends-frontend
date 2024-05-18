import { FRIENDS } from '../mocks/friends.mocks';
import { User } from '../types';

export function loadFriendsUser(): Promise<Omit<User, 'tainings'>[]> {
  return Promise.resolve(FRIENDS);
}

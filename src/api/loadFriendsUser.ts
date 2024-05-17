import { FRIENDS_USER } from '../mocks/friends-user.mocks';
import { User } from '../types';

export function loadFriendsUser(): Promise<User[]> {
  return Promise.resolve(FRIENDS_USER as User[]);
}

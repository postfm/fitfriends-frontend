import { FRIENDS_COACH } from '../mocks/friends-coach.mocks';
import { User } from '../types';

export function loadFriendsCoach(): Promise<User[]> {
  return Promise.resolve(FRIENDS_COACH);
}

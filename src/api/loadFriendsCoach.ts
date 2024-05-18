import { FRIENDS } from '../mocks/friends.mocks';
import { User } from '../types';

export function loadFriendsCoach(): Promise<Omit<User, 'trainings'>[]> {
  return Promise.resolve(FRIENDS);
}

import { User } from '../types';

export function updateUser(user: User): Promise<User> {
  return Promise.resolve(user);
}

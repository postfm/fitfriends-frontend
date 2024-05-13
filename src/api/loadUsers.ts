import { USERS_MOCK } from '../mocks/users.mocks';
import { User } from '../types';

export function loadUsers(): Promise<User[]> {
  return Promise.resolve(USERS_MOCK.data);
}

import { USERS_MOCK } from '../mocks/users.mocks';
import { User } from '../types';

export function loadUser(id: number): Promise<User> {
  return Promise.resolve(USERS_MOCK.data).then(
    (users) => users.filter((user) => user.id === id)[0]
  );
}

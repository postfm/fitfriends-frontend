import { USERS_MOCK } from '../mocks/users.mocks';
import { User, NewUser } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function register(newUser: NewUser): Promise<User> {
  const foundUser = USERS_MOCK.data.find(
    (user) => newUser.roles === user.roles
  );
  if (!foundUser) {
    throw Error('error');
  }
  return Promise.resolve({ ...foundUser, ...newUser });
}

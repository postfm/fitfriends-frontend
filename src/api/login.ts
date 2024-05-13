import { USERS_MOCK } from '../mocks/users.mocks';
import { User } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function login(email: string, _password: string): Promise<User> {
  const foundUser = USERS_MOCK.data.find(user => email === user.email)
  if (!foundUser) {
    throw Error('error')
  }
  return Promise.resolve(foundUser);
}

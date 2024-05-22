import { client } from '../client/client';
import { Tokens } from '../client/token';
import { User, NewUser } from '../types';

export function register(newUser: NewUser) {
  return client.post<{ tokens: Tokens; user: User }>('auth/register', newUser);
}

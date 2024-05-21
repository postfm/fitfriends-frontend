import { client } from '../client/client';
import { Tokens } from '../client/token';
import { User } from '../types';

export function login(email: string, password: string) {
  return client.post<{
    tokens: Tokens;
    currentUser: User;
  }>('auth/login', { email: email, password: password });
}

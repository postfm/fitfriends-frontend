import { client } from '../client/client';
import { PaginatedResponse, User } from '../types';

export function loadUsers() {
  return client.get<PaginatedResponse<User>>('users');
}

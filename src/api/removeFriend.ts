import { client } from '../client/client';

export function removeFriend(userId: number) {
  return client.delete(`friends/${userId}`);
}

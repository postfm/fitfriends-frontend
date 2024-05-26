import { client } from '../client/client';

export function addFriend(userId: number) {
  return client.post(`friends/${userId}`);
}

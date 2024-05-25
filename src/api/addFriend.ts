import { client } from '../client/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function addFriend(userId: number) {
  return client.post(`friends/${userId}`);
}

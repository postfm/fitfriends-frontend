import { client } from '../client/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function removeFriend(userId: number) {
  return client.delete(`friends/${userId}`);
}

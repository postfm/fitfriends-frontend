import { client } from '../client/client';

export function unsubscribeFromCoach(userId: number) {
  return client.delete(`/subscriber/${userId}`);
}

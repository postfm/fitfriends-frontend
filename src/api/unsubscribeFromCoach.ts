import { client } from '../client/client';

/* eslint-disable @typescript-eslint/no-unused-vars */
export function unsubscribeFromCoach(userId: number) {
  return client.delete(`/subscriber/${userId}`);
}

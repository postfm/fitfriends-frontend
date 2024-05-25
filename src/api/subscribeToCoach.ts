import { client } from '../client/client';
import { NewSubscription } from '../types';

/* eslint-disable @typescript-eslint/no-unused-vars */
export function subscribeToCoach(
  userId: number,
  subscription: NewSubscription
) {
  return client.post(`/subscriber/${userId} `, subscription);
}

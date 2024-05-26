import { client } from '../client/client';
import { NewSubscription } from '../types';

export function subscribeToCoach(
  userId: number,
  subscription: NewSubscription
) {
  return client.post(`/subscriber/${userId} `, subscription);
}

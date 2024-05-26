import { client } from '../client/client';
import { Subscription } from '../types';

export function loadSubscriptions(coachId: number) {
  return client.get<Subscription[]>(`subscriber/${coachId}`);
}

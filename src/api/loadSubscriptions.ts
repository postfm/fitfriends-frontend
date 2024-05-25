import { client } from '../client/client';
import { Subscription } from '../types';

/* eslint-disable @typescript-eslint/no-unused-vars */
export function loadSubscriptions(coachId: number) {
  return client.get<Subscription[]>(`subscriber/${coachId}`);
}

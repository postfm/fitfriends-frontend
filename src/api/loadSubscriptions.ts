import { SUBSCRIBERS_MOCK } from '../mocks/subscriber.mocks';
import { Subscription } from '../types';

/* eslint-disable @typescript-eslint/no-unused-vars */
export function loadSubscriptions(_coachId: number): Promise<Subscription[]> {
  return Promise.resolve(SUBSCRIBERS_MOCK);
}

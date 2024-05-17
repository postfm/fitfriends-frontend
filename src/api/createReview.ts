import { NewReview } from '../types';

export function createReview(review: NewReview): Promise<NewReview> {
  return Promise.resolve(review);
}

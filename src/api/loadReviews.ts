import { REVIEWS } from '../mocks/reviews.mocks';
import { Review } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function loadReviews(id: number): Promise<Review[]> {
  return Promise.resolve(REVIEWS);
}

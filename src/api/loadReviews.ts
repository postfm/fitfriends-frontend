import { REVIEWS } from '../mocks/reviews.mocks';
import { Review } from '../types';

export function loadReviews(): Promise<Review[]> {
  return Promise.resolve(REVIEWS);
}

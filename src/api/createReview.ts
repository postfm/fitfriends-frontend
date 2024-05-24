import { client } from '../client/client';
import { NewReview, Review } from '../types';

export function createReview(trainingId: number, review: NewReview) {
  return client.post<Review>(`reviews/${trainingId}`, review);
}

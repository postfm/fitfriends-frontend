import { client } from '../client/client';
import { Review } from '../types';

export function loadReviews(trainingId: number) {
  return client.get<Review[]>(`reviews/${trainingId}`);
}

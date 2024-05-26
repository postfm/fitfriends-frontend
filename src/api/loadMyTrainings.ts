import { client } from '../client/client';
import { Training } from '../types';

export function loadMyTraining(coachId: number) {
  return client.get<Training[]>(`trainings/coach/${coachId}`);
}

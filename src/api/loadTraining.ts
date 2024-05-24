import { client } from '../client/client';
import { Training } from '../types';

export function loadTraining(id: number) {
  return client.get<Training>(`trainings/${id}`);
}

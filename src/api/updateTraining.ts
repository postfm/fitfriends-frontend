import { client } from '../client/client';
import { NewTraining, Training } from '../types';

export function updateTraining(trainingId: number, training: NewTraining) {
  return client.patch<Training>(`trainings/${trainingId}`, training);
}

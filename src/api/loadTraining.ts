import { TRAININGS_MOCK } from '../mocks/trainings.mocks';
import { Training } from '../types';

export function loadTraining(id: number): Promise<Training> {
  const training = TRAININGS_MOCK.data.find(
    (training) => training.trainingId === id
  );

  if (!training) {
    throw 'not found';
  }

  return Promise.resolve(training);
}

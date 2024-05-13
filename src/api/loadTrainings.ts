import { TRAININGS_MOCK } from '../mocks/trainings.mocks';
import { Training } from '../types';

export function loadTrainings(): Promise<Training[]> {
  return Promise.resolve(TRAININGS_MOCK.data);
}

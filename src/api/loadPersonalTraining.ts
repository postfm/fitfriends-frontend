import { PERSONAL_TRAININGS } from '../mocks/personal-training.mock';
import { PersonalTraining } from '../types';

export function loadPersonalTraining(): Promise<PersonalTraining[]> {
  return Promise.resolve(PERSONAL_TRAININGS);
}

import { client } from '../client/client';
import { PersonalTraining } from '../types';

export function loadPersonalTraining() {
  return client.get<PersonalTraining[]>('personal-trainings');
}

import { client } from '../client/client';
import { NewPersonalTraining, PersonalTraining } from './../types/data-types';

export function updatePersonalTraining(
  userId: number,
  personalTraining: NewPersonalTraining
) {
  return client.patch<PersonalTraining>(
    `personal-trainings/${userId}`,
    personalTraining
  );
}

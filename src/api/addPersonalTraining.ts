import { client } from '../client/client';
import { NewPersonalTraining, PersonalTraining } from '../types';

export function addPersonalTraining(
  userId: number,
  personalTraining: NewPersonalTraining
) {
  console.log(userId);
  return client.post<PersonalTraining>(
    `personal-trainings/${userId}`,
    personalTraining
  );
}

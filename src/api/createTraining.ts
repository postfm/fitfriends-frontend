import { client } from '../client/client';
import { NewTraining, Training, TrainingGender } from '../types';

export function createTraining(training: NewTraining) {
  const newTraining = {
    ...training,
    type: training.type.toLowerCase(),
    price: Number(training.price),
    calories: Number(training.calories),
    gender: TrainingGender[training.gender as keyof typeof TrainingGender],
  };
  return client.post<Training>('trainings', newTraining);
}

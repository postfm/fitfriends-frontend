import { NewTraining, Training, User } from '../types';

export function createTraining(training: NewTraining): Promise<Training> {
  return Promise.resolve({
    ...training,
    trainingId: 1,
    createdAt: '',
    updatedAt: '',
    reviews: [],
    user: {} as User,
  });
}

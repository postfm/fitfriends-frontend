import { NewTraining } from '../types';

export function updateTraining(training: NewTraining): Promise<NewTraining> {
  return Promise.resolve(training);
}

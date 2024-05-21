import { client } from '../client/client';
import { PaginatedResponse, Training } from '../types';

export function loadTrainings() {
  return client.get<PaginatedResponse<Training>>('trainings/catalog');
}

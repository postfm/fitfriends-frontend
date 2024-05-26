import { Purchases } from '../types';
import { client } from '../client/client';

export function loadMyPurchases() {
  return client.get<Purchases[]>(
    'trainings/ordered?sortingType=cost&sortDirection=ASC'
  );
}

import { Purchases } from '../types';
import { client } from '../client/client';

export function loadMyPurchases(url: string) {
  return client.get<Purchases[]>(`trainings/ordered?${url}`);
}

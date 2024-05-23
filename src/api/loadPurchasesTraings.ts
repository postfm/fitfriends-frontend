import { client } from '../client/client';
import { Order } from '../types';

export function loadPersonalTraining() {
  return client.get<Order[]>('orders');
}

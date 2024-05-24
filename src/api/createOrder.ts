import { client } from '../client/client';
import { NewOrder, Order } from '../types';

export function createOrder(order: NewOrder, trainingId: number) {
  return client.post<Order>(`orders/${trainingId}`, order);
}

import { Order } from '../types';
import { client } from '../client/client';

export function loadMyOrders() {
  return client.get<Order[]>('orders');
}

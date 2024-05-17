import { Order } from '../types';

export function createOrder(order: Order): Promise<Order> {
  return Promise.resolve(order);
}

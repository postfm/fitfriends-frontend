import { NewOrder, Order } from '../types';

export function createOrder(order: NewOrder): Promise<Order> {
  return Promise.resolve(order as Order);
}

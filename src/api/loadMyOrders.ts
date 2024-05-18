import { MY_ORDERS } from './../mocks/my-orders.mocks';
import { Order } from '../types';

export function loadMyOrders(): Promise<Order[]> {
  return Promise.resolve(MY_ORDERS);
}

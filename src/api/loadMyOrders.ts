import { MY_ORDERS } from './../mocks/my-orders.mocks';
import { MyOrder } from '../types';

export function loadMyOrders(): Promise<MyOrder[]> {
  return Promise.resolve(MY_ORDERS);
}

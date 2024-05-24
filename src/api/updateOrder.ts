import { client } from '../client/client';
import { NewOrder, Order, OrderAmountTraining } from '../types';

export function updateOrder(
  id: number,
  newOrder: OrderAmountTraining | NewOrder
) {
  return client.patch<Order>(`orders/${id}`, newOrder);
}

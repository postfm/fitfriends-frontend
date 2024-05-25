import { client } from '../client/client';
import { Notify } from '../types/data-types';

export function loadNotifications() {
  return client.get<Notify[]>('alerts');
}

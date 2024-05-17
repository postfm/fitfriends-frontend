import { NOTIFICATIONS } from '../mocks/notifications.mocks';
import { Notify } from '../types/data-types';

export function loadNotifications(): Promise<Notify[]> {
  return Promise.resolve(NOTIFICATIONS);
}

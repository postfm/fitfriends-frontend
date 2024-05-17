import { NOTIFICATIONS } from '../mocks/notifications.mocks';
import { Notification } from '../types/data-types';

export function loadNotifications(): Promise<Notification[]> {
  return Promise.resolve(NOTIFICATIONS);
}

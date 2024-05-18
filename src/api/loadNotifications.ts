import { NOTIFICATIONS } from '../mocks/notifications.mocks';
import { Notify } from '../types/data-types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function loadNotifications(_userId: number): Promise<Notify[]> {
  return Promise.resolve(NOTIFICATIONS);
}

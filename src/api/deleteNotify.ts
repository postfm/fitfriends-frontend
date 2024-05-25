import { client } from '../client/client';

export function deleteNotify(id: number) {
  return client.delete(`alerts/${id}`);
}

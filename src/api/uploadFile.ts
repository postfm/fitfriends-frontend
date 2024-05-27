import { client } from '../client/client';

export function uploadFile(key: string, formData: FormData) {
  return client.post<string>(`files/upload/${key}`, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
}

import { client } from '../client/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function deleteFile(avatar: string) {
  return client.post<string>(
    'files/delete',
    { filePath: avatar },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}

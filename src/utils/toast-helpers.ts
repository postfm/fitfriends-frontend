import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function postApiResponseError(
  error: AxiosError<{ error: string; message: string[]; statusCode: 400 }>
) {
  const message = error?.response?.data?.message;
  if (!message) {
    toast.error('Unknown error');
    return;
  }

  toast.error(
    Array.isArray(message) ? message.join(', ') : message || 'Uknown error'
  );
}

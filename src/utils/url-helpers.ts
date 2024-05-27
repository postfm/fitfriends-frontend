import { DEFAULT_PORT } from '../constants/constants';

export function getURL(file: string) {
  return `${DEFAULT_PORT}${file}`;
}

export function getURL(file: string) {
  return `${process.env.VITE_API_BASE_URL as string}${file}`;
}

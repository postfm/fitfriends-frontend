export function getDateTime(dateTime: string) {
  const notifyDate = new Date(dateTime);

  const formatter = new Intl.DateTimeFormat('ru', {
    month: 'long',
    day: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return formatter.format(notifyDate);
}

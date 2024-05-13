export function renderPrice(price: number, discount?: boolean) {
  return `${price * (discount ? 0.9 : 1)} ₽`;
}

export function renderHashtag(name: string) {
  return `#${name}`;
}

export function renderCal(amount: number) {
  return `${amount}ккал`;
}

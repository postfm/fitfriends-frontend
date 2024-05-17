export function renderPrice(price: number, discount?: boolean) {
  return `${price * (discount ? 0.9 : 1)} ₽`;
}

export function renderHashtag(name: string) {
  return `#${name}`;
}

export function renderCal(amount: number) {
  return `${amount}ккал`;
}

export function renderLocation(location: string) {
  return `ст. м. ${location}`;
}

export function renderCash(price: number) {
  return `${price} ₽`;
}

const THOUTNEND_VALUE = 1000;

export function renderTotalCost(cost: number) {
  const thouthend = Math.trunc(cost / THOUTNEND_VALUE);
  const hundred = cost - thouthend * THOUTNEND_VALUE;

  const totalCost = thouthend
    ? `${thouthend}${'\u00A0'}${hundred}${'\u00A0'}₽`
    : `${hundred}${'\u00A0'}₽`;
  return totalCost;
}

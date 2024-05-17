import { PRICE_WITH_DISCOUNT } from '../constants/constants';

export function renderPrice(price: number, discount?: boolean) {
  return `${price * (discount ? PRICE_WITH_DISCOUNT : 1)} ₽`;
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

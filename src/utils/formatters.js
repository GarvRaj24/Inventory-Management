import { CURRENCIES } from '../data/products';

export function formatPrice(amountInUSD, currencyKey = 'USD') {
  const currency = CURRENCIES[currencyKey] || CURRENCIES.USD;
  const converted = Math.round(amountInUSD * currency.rate);

  if (currencyKey === 'JPY') {
    return `¥${converted.toLocaleString('en-US')}`;
  }

  return `${currency.symbol}${converted.toLocaleString('en-US')}`;
}

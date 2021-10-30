export interface MonetaryValue {
  value: number; // in cents
  currency: Currency;
}

export enum Currency {
  USD = 'usd',
  JPY = 'jpy',
}

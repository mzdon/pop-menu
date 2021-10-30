import {Currency, MonetaryValue} from 'models/MonetaryValue';

export const formatValue = (value: MonetaryValue) => {
  const {symbol, symbolPosition, decimalSeparator, decimalPlaces} =
    getCurrencyDetails(value.currency);
  const resultWithPlaces = handleDecimalPlaces(
    value.value,
    decimalPlaces,
    decimalSeparator,
  );
  return handleSymbol(resultWithPlaces, symbolPosition, symbol);
};

interface CurrencyDetails {
  symbol: string;
  symbolPosition: 0 | 1; // 0 = beginning of value, 1 = end of value
  decimalSeparator: string;
  decimalPlaces: number;
}
export const getCurrencyDetails = (c: Currency) => {
  switch (c) {
    case Currency.JPY:
      return {
        symbol: '¥',
        symbolPosition: 0,
        decimalSeparator: '',
        decimalPlaces: 0,
      };
    case Currency.USD:
    default:
      return {
        symbol: '$',
        symbolPosition: 0,
        decimalSeparator: '.',
        decimalPlaces: 2,
      };
  }
};

export const handleDecimalPlaces = (
  value: number,
  places: number,
  separator: string,
): string => {
  const strValue = String(value);
  if (strValue.length <= places) {
    return `0${separator}${strValue.padStart(places, '0')}`;
  }
  const breakPoint = strValue.length - places;
  return `${strValue.substr(0, breakPoint)}${separator}${strValue.substr(
    breakPoint,
  )}`;
};

export const handleSymbol = (
  value: string,
  pos: number,
  sym: string,
): string => {
  const idx = value.length * pos;
  return `${value.substr(0, idx)}${sym}${value.substr(idx)}`;
};

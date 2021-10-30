import {Currency} from 'models/MonetaryValue';
import {formatValue} from 'utils/MonetaryValue';

describe('MonetaryValue utils', () => {
  describe('formatValue', () => {
    it('should format a value according to its currency', () => {
      expect(formatValue({value: 100, currency: Currency.USD})).toBe('$1.00');
      expect(formatValue({value: 100, currency: Currency.JPY})).toBe('¥100');
    });

    it('should handle values smaller than the decimal places defined by its currency', () => {
      expect(formatValue({value: 1, currency: Currency.USD})).toBe('$0.01');
    });

    it('should handle negative values', () => {
      expect(formatValue({value: -1, currency: Currency.USD})).toBe('-$0.01');
    });
  });
});

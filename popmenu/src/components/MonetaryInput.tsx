import React from 'react';

import {TextInput} from 'react-native';

import Input, {InputProps} from 'components/Input';
import {Currency} from 'models/MonetaryValue';
import {ALL_SPECIAL_CHARS_REGEX, formatValue} from 'utils/MonetaryValue';

interface Props extends Omit<InputProps, 'onChangeText' | 'value'> {
  value: number;
  currency: Currency;
  onChangeText: (value: number) => void;
}

const MonentaryInput = React.forwardRef<TextInput, Props>(
  (
    {value, currency, onChangeText, ...rest}: Props,
    ref,
  ): React.ReactElement<Props> => {
    const formattedValue = formatValue({value, currency});
    const onChange = React.useCallback(
      (nextStr: string) => {
        const strippedStr = nextStr.replace(ALL_SPECIAL_CHARS_REGEX, '') || '0';
        onChangeText(Number(strippedStr));
      },
      [onChangeText],
    );
    return (
      <Input
        ref={ref}
        value={formattedValue}
        onChangeText={onChange}
        {...rest}
      />
    );
  },
);

export default MonentaryInput;

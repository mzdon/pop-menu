import React from 'react';

import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';

import Text from 'components/Text';
import {commonStyles, textStyles, useTheme} from 'styles';

export interface InputProps extends TextInputProps {
  label?: string;
  labelStyle?: TextStyle;
  error?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {label, labelStyle, error, style, ...rest}: InputProps,
    ref,
  ): React.ReactElement<InputProps> => {
    const theme = useTheme();
    const color = error ? theme.errorColor : theme.textColor;
    const themeStyle = {
      color,
      borderColor: color,
    };
    return (
      <View style={styles.container}>
        {!!label && (
          <Text style={[themeStyle, styles.label, labelStyle]}>{label}</Text>
        )}
        <TextInput
          ref={ref}
          style={[themeStyle, styles.input, style]}
          {...rest}
        />
        {!!error && <Text style={[themeStyle, styles.error]}>{error}</Text>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...commonStyles.padding,
    ...commonStyles.flex1,
    flexGrow: 1,
  },
  label: {
    ...textStyles.base,
  },
  input: {
    ...textStyles.baseBold,
    borderBottomWidth: 2,
  },
  error: {
    ...textStyles.subText,
  },
});

export default Input;

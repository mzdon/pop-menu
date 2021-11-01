import React from 'react';

import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import Text from 'components/Text';
import {commonStyles, textStyles, useTheme} from 'styles';

export interface InputProps extends TextInputProps {
  label?: string;
  labelStyle?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
}

interface SelectionState {
  selection: {start: number; end: number} | undefined;
  initialFocusHappened: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {label, labelStyle, error, style, containerStyle, ...rest}: InputProps,
    ref,
  ): React.ReactElement<InputProps> => {
    const theme = useTheme();
    const color = error ? theme.errorColor : theme.textColor;
    const themeStyle = {
      color,
      borderColor: color,
    };
    return (
      <View style={[styles.container, containerStyle]}>
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

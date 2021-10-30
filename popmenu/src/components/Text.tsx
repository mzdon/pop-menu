import React from 'react';

import {Text as RNText, TextProps} from 'react-native';

import {useTheme} from 'styles';

const Text = ({
  children,
  style,
  ...rest
}: TextProps): React.ReactElement<TextProps> => {
  const theme = useTheme();
  return (
    <RNText style={[{color: theme.textColor}, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;

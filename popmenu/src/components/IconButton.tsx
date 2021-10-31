import React from 'react';

import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import {baseFontSize, commonStyles, useTheme} from 'styles';

interface Props {
  icon: IconProp;
  iconColor: string;
  iconScale?: number;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  onPress: () => void;
}

const SIZE = baseFontSize * 1.25;

const IconButton = ({
  icon,
  iconColor,
  iconScale = 1,
  containerStyle,
  disabled = false,
  onPress,
}: Props): React.ReactElement<Props> => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={disabled}>
      <FontAwesomeIcon
        icon={icon}
        size={SIZE * iconScale}
        color={disabled ? theme.greyColor : iconColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.padding,
    ...commonStyles.flex1,
    height: SIZE * 2,
    justifyContent: 'center',
  },
});

export default IconButton;

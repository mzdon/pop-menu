import React from 'react';

import {
  Image,
  ImagePropsBase,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import uhoh from 'images/uhoh.png';
import {useTheme} from 'styles';

type Props = React.PropsWithChildren<{
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
}> &
  ImagePropsBase;

const MenuItemImage = ({
  containerStyle,
  imageStyle,
  children,
  ...rest
}: Props): React.ReactElement<Props> => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.imageContainer,
        {backgroundColor: theme.greyColor},
        containerStyle,
      ]}>
      <Image
        style={[styles.image, imageStyle]}
        defaultSource={uhoh}
        {...rest}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 120,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default MenuItemImage;

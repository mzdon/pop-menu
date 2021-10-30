import React from 'react';

import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Image, StyleSheet, View} from 'react-native';

import IconButton from 'components/IconButton';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import uhoh from 'images/uhoh.png';
import {MenuItem} from 'models/MenuItem';
import {baseFontSize, commonStyles, textStyles, useTheme} from 'styles';
import {formatValue} from 'utils/MonetaryValue';

interface Props {
  item: MenuItem;
  onRemove: (id: string) => void;
}

const MenuItemCard = ({item, onRemove}: Props): React.ReactElement<Props> => {
  const theme = useTheme();

  const {id, title, description, imageUrl, price} = item;
  const formattedPrice = formatValue(price);

  return (
    <View
      style={styles.container}
      accessibilityRole={'text'}
      accessibilityLabel={`${title} ${description} ${formattedPrice}`}>
      <View
        style={[
          styles.innerContainer,
          {
            borderColor: theme.greyColor,
            shadowColor: theme.greyColor,
            backgroundColor: theme.backgroundColor,
          },
        ]}>
        <View
          style={[styles.imageContainer, {backgroundColor: theme.greyColor}]}>
          <Image
            style={styles.image}
            source={{uri: imageUrl}}
            defaultSource={uhoh}
          />
          <View
            style={[
              styles.priceContainer,
              {backgroundColor: theme.backgroundColor},
            ]}>
            <Text style={[textStyles.baseBold, styles.price]}>
              {formattedPrice}
            </Text>
          </View>
          <View
            style={[
              styles.deleteContainer,
              {backgroundColor: theme.backgroundColor},
            ]}>
            <IconButton
              icon={faTrash}
              iconColor={theme.ctaColor}
              onPress={() => onRemove(id)}
            />
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Spacer />
          <>
            <Text style={textStyles.base} numberOfLines={2}>
              {title}
            </Text>
          </>
          <Spacer heightScale={0.5} />
          <>
            <Text style={textStyles.subText} numberOfLines={3}>
              {description}
            </Text>
          </>
          <Spacer />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.padding,
  },
  innerContainer: {
    ...commonStyles.flex1,
    borderWidth: 1,
    borderRadius: 3,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  imageContainer: {
    height: 120,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  detailsContainer: {
    ...commonStyles.flex1,
    ...commonStyles.padding,
  },
  priceContainer: {
    ...commonStyles.padding,
    position: 'absolute',
    bottom: 0,
    right: 20,
    borderTopEndRadius: 3,
  },
  deleteContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
    borderRadius: 25,
  },
  price: {
    lineHeight: baseFontSize * 1.5,
  },
});

export default MenuItemCard;

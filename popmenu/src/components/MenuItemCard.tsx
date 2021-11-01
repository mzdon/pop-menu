import React from 'react';

import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Alert, StyleSheet, View} from 'react-native';

import IconButton from 'components/IconButton';
import MenuItemImage from 'components/MenuItemImage';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import {MenuItem} from 'models/MenuItem';
import {
  baseFontSize,
  basePadding,
  commonStyles,
  textStyles,
  useTheme,
} from 'styles';
import {formatValue} from 'utils/MonetaryValue';

interface Props {
  item: MenuItem;
  onEdit: () => void;
  onRemove: (id: string) => void;
}

const MenuItemCard = ({
  item,
  onEdit,
  onRemove,
}: Props): React.ReactElement<Props> => {
  const theme = useTheme();

  const {id, title, description, imageUrl, price} = item;
  const formattedPrice = formatValue(price);

  const onVerifyRemove = () => {
    Alert.alert(`Are you sure you want to delete '${title}'?`, undefined, [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: () => onRemove(id)},
    ]);
  };

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
        <MenuItemImage source={{uri: imageUrl}}>
          <View
            style={[
              styles.priceContainer,
              {backgroundColor: theme.backgroundColor},
            ]}>
            <Text style={[textStyles.baseBold, styles.price]}>
              {formattedPrice}
            </Text>
          </View>
          <View style={styles.actionsContainer}>
            <View
              style={[
                styles.actionContainer,
                {backgroundColor: theme.backgroundColor},
              ]}>
              <IconButton
                icon={faPencilAlt}
                iconColor={theme.ctaColor}
                onPress={onEdit}
              />
            </View>
            <View
              style={[
                styles.actionContainer,
                {backgroundColor: theme.backgroundColor},
              ]}>
              <IconButton
                icon={faTrash}
                iconColor={theme.errorColor}
                onPress={onVerifyRemove}
              />
            </View>
          </View>
        </MenuItemImage>
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
    ...commonStyles.shadow,
    borderWidth: 1,
    borderRadius: 3,
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
  actionsContainer: {
    position: 'absolute',
    top: 0,
    right: basePadding * 0.5,
  },
  actionContainer: {
    ...commonStyles.shadow,
    borderRadius: 25,
    marginTop: basePadding * 0.5,
  },
  price: {
    lineHeight: baseFontSize * 1.5,
  },
});

export default MenuItemCard;

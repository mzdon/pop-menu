import React from 'react';

import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {StyleSheet, View} from 'react-native';

import IconButton from 'components/IconButton';
import Input from 'components/Input';
import MenuItemImage from 'components/MenuItemImage';
import Spacer from 'components/Spacer';
import {MenuItem, MenuItemData} from 'models/MenuItem';
import {
  baseFontSize,
  basePadding,
  commonStyles,
  textStyles,
  useTheme,
} from 'styles';
import {useEditMenuItem} from 'utils/EditMenuItem';
import {useMenuItemValidation} from 'utils/Validation';
import MonentaryInput from './MonetaryInput';

interface Props {
  item: MenuItem;
  onUpdate: (item: MenuItem) => void;
  onSave: () => void;
  onCancel: () => void;
}

const MenuItemCard = ({
  item,
  onUpdate,
  onSave,
  onCancel,
}: Props): React.ReactElement<Props> => {
  const theme = useTheme();

  const {title, description, imageUrl, price} = item;

  const onUpdateItem = (fn: (item: MenuItemData) => MenuItemData) => {
    const updatedItem = fn(item);
    if (!item.id) {
      throw new Error('Menu Item is missing an id!');
    }
    onUpdate(updatedItem as MenuItem);
  };
  const {onChangeDescription, onChangeImageUrl, onChangePrice, onChangeTitle} =
    useEditMenuItem(onUpdateItem);

  const {errors, hasErrors, validate, onImageLoad, onImageError} =
    useMenuItemValidation();

  React.useEffect(() => {
    validate(item);
  }, [item, validate]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          {
            borderColor: theme.ctaColor,
            shadowColor: theme.ctaColor,
            backgroundColor: theme.backgroundColor,
          },
        ]}>
        <MenuItemImage
          source={{uri: imageUrl}}
          onLoad={onImageLoad}
          onError={onImageError}>
          <View
            style={[
              styles.priceContainer,
              {backgroundColor: theme.backgroundColor},
            ]}>
            <MonentaryInput
              style={[textStyles.baseBold, styles.price]}
              value={price.value}
              currency={price.currency}
              onChangeText={onChangePrice}
            />
          </View>
          <View style={styles.actionsContainer}>
            <Input
              containerStyle={[
                styles.imageUrlInput,
                {backgroundColor: theme.backgroundColor},
              ]}
              value={imageUrl}
              onChangeText={onChangeImageUrl}
              error={errors.imageUrl}
              selectTextOnFocus
            />
            <View>
              <View
                style={[
                  styles.actionContainer,
                  {backgroundColor: theme.backgroundColor},
                ]}>
                <IconButton
                  icon={faCheck}
                  iconColor={theme.confirmColor}
                  disabled={hasErrors}
                  onPress={onSave}
                />
              </View>
              <View
                style={[
                  styles.actionContainer,
                  {backgroundColor: theme.backgroundColor},
                ]}>
                <IconButton
                  icon={faTimes}
                  iconColor={theme.errorColor}
                  onPress={onCancel}
                />
              </View>
            </View>
          </View>
        </MenuItemImage>
        <View style={styles.detailsContainer}>
          <Spacer />
          <Input
            style={textStyles.base}
            value={title}
            onChangeText={onChangeTitle}
            error={errors.title}
            selectTextOnFocus
          />
          <Spacer heightScale={0.5} />
          <Input
            style={textStyles.subText}
            value={description}
            onChangeText={onChangeDescription}
            error={errors.description}
            selectTextOnFocus
          />
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
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: basePadding * 0.5,
  },
  imageUrlInput: {
    ...commonStyles.padding,
    marginRight: basePadding * 0.5,
    paddingVertical: basePadding,
    alignSelf: 'flex-start',
  },
  actionContainer: {
    ...commonStyles.shadow,
    borderRadius: 25,
    marginBottom: basePadding * 0.5,
  },
  price: {
    lineHeight: baseFontSize * 1.5,
  },
});

export default MenuItemCard;

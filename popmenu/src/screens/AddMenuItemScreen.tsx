import React from 'react';

import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import IconButton from 'components/IconButton';
import Input from 'components/Input';
import MenuItemImage from 'components/MenuItemImage';
import MonetaryInput from 'components/MonetaryInput';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import {Currency, MonetaryValue} from 'models/MonetaryValue';
import {AddMenuItemScreenNavigationProp} from 'navigation/RouteTypes';
import {useMenuContext} from 'providers/MenuProvider';
import {commonStyles, textStyles, useTheme} from 'styles';
import {useEditMenuItem} from 'utils/EditMenuItem';
import {useMenuItemValidation} from 'utils/Validation';

interface StateData {
  title: string;
  description: string;
  imageUrl: string;
  price: MonetaryValue;
}

export const useAddMenuItemScreenHelper = () => {
  const [state, setState] = React.useState<StateData>({
    title: '',
    description: '',
    imageUrl: '',
    price: {
      value: 0,
      currency: Currency.USD,
    },
  });

  const {onChangeDescription, onChangeImageUrl, onChangePrice, onChangeTitle} =
    useEditMenuItem(setState);

  return {
    menuItem: state,
    onChangeImageUrl,
    onChangeTitle,
    onChangeDescription,
    onChangePrice,
  };
};

const AddMenuItemScreen = () => {
  const {
    menuItem,
    onChangeDescription,
    onChangeImageUrl,
    onChangePrice,
    onChangeTitle,
  } = useAddMenuItemScreenHelper();
  const {imageUrl, title, description, price} = menuItem;

  const {errors, hasErrors, validate, update, onImageLoad, onImageError} =
    useMenuItemValidation();

  React.useEffect(() => {
    update(menuItem);
  }, [menuItem, update]);

  const {addMenuItem} = useMenuContext();
  const theme = useTheme();
  const navigation = useNavigation<AddMenuItemScreenNavigationProp>();

  const SubmitButton = React.useCallback(() => {
    const onSubmit = () => {
      const isValid = validate(menuItem);
      if (isValid) {
        addMenuItem(menuItem);
        navigation.goBack();
      }
    };
    return (
      <IconButton
        icon={faCheck}
        iconColor={theme.confirmColor}
        disabled={hasErrors}
        onPress={onSubmit}
      />
    );
  }, [
    addMenuItem,
    hasErrors,
    menuItem,
    navigation,
    theme.confirmColor,
    validate,
  ]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add Menu Item',
      headerRight: SubmitButton,
    });
  }, [SubmitButton, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spacer />
      <Text style={styles.header}>Add Menu Item</Text>
      <Spacer />
      <MenuItemImage
        key={imageUrl}
        source={{uri: imageUrl}}
        onLoad={onImageLoad}
        onError={onImageError}
      />
      <Spacer />
      <View style={styles.inputsContainer}>
        <Input
          label="Image URL"
          value={imageUrl}
          onChangeText={onChangeImageUrl}
          error={errors.imageUrl}
          selectTextOnFocus
        />
        <Spacer />
        <Input
          label="Title"
          value={title}
          onChangeText={onChangeTitle}
          error={errors.title}
        />
        <Spacer />
        <Input
          label="Description"
          value={description}
          onChangeText={onChangeDescription}
          error={errors.description}
        />
        <MonetaryInput
          label="Price"
          value={price.value}
          currency={price.currency}
          onChangeText={onChangePrice}
          error={errors.price}
        />
      </View>
      <Spacer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flex1,
  },
  header: {
    ...commonStyles.padding,
    ...textStyles.header,
  },
  inputsContainer: {
    ...commonStyles.padding,
    ...commonStyles.flex1,
  },
});

export default AddMenuItemScreen;

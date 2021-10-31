import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import IconButton from 'components/IconButton';
import Input from 'components/Input';
import MenuItemImage from 'components/MenuItemImage';
import MonetaryInput from 'components/MonetaryInput';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import {AddMenuItemScreenNavigationProp} from 'navigation/RouteTypes';
import {useAddMenuItemScreenHelper} from 'screens/AddMenuItemScreenHelper';
import {commonStyles, textStyles, useTheme} from 'styles';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {useMenuContext} from 'providers/MenuProvider';

const AddMenuItemScreen = () => {
  const {
    state,
    hasErrors,
    onImageError,
    onImageLoad,
    onChangeDescription,
    onChangeImageUrl,
    onChangePrice,
    onChangeTitle,
    validate,
  } = useAddMenuItemScreenHelper();
  const {errors, data} = state;
  const {imageUrl, title, description, price} = data;

  const {addMenuItem} = useMenuContext();
  const theme = useTheme();
  const navigation = useNavigation<AddMenuItemScreenNavigationProp>();

  const SubmitButton = React.useCallback(() => {
    const onSubmit = () => {
      const isValid = validate();
      console.log(isValid);
      if (isValid) {
        addMenuItem(data);
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
  }, [addMenuItem, data, hasErrors, navigation, theme.confirmColor, validate]);

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
      <Input
        label="Image URL"
        value={imageUrl}
        onChangeText={onChangeImageUrl}
        error={errors.imageUrl}
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
      <Spacer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...commonStyles.padding,
    ...textStyles.header,
  },
});

export default AddMenuItemScreen;

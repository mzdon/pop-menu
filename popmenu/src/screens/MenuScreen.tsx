import React from 'react';

import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {Alert, FlatList, ListRenderItem, StyleSheet, View} from 'react-native';

import EditableMenuItemCard from 'components/EditableMenuItemCard';
import IconButton from 'components/IconButton';
import MenuItemCard from 'components/MenuItemCard';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import {MenuItem} from 'models/MenuItem';
import {ADD_MENU_ITEM, MenuScreenNavigationProp} from 'navigation/RouteTypes';
import {commonStyles, textStyles, useTheme} from 'styles';
import {useMenuContext} from 'providers/MenuProvider';

interface Props {}

const stickyIndicies = [0];

const MenuScreen = (): React.ReactElement<Props> => {
  const {
    state,
    removeMenuItem,
    editMenuItem,
    updateMenuItem,
    saveMenuItem,
    cancelEdit,
  } = useMenuContext();
  const {menu, editingItem} = state;
  const theme = useTheme();
  const navigation = useNavigation<MenuScreenNavigationProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Menu: ${menu.title}`,
      headerRight: () => (
        <IconButton
          icon={faPlus}
          iconColor={theme.ctaColor}
          onPress={() => navigation.navigate(ADD_MENU_ITEM)}
        />
      ),
    });
  });

  const MenuHeader = () => (
    <View style={{backgroundColor: theme.backgroundColor}}>
      <Text style={styles.header}>{menu.title}</Text>
      <Spacer />
    </View>
  );

  const scrollRef = React.useRef<FlatList | null>(null);
  const scrollToEditingItem = () => {
    const index = menu.items.findIndex(item => item.id === editingItem?.id);
    scrollRef.current?.scrollToIndex({animated: true, index});
  };

  const renderItem: ListRenderItem<MenuItem> = ({item}) => {
    if (editingItem?.id === item.id) {
      return (
        <EditableMenuItemCard
          item={item}
          onUpdate={updateMenuItem}
          onSave={saveMenuItem}
          onCancel={cancelEdit}
        />
      );
    }
    const onEdit = () => {
      if (editingItem) {
        Alert.alert('Another item is already being edited!', undefined, [
          {text: 'Show Me', style: 'cancel', onPress: scrollToEditingItem},
        ]);
      } else {
        editMenuItem(item.id);
      }
    };
    return (
      <MenuItemCard item={item} onEdit={onEdit} onRemove={removeMenuItem} />
    );
  };

  return (
    <>
      <Spacer />
      <FlatList
        ref={scrollRef}
        style={styles.container}
        data={menu.items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={MenuHeader}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No menu items! :_(</Text>
        }
        ItemSeparatorComponent={Spacer}
        stickyHeaderIndices={stickyIndicies}
      />
      <Spacer />
    </>
  );
};

const styles = StyleSheet.create({
  container: commonStyles.flex1,
  header: {
    ...commonStyles.padding,
    ...textStyles.header,
  },
  emptyMessage: {
    ...textStyles.subHeader,
    ...commonStyles.padding,
  },
});

export default MenuScreen;

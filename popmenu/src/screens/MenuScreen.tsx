import React from 'react';

import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';

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
  const {state, removeMenuItem} = useMenuContext();
  const {menu} = state;
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

  const renderItem: ListRenderItem<MenuItem> = ({item}) => {
    return <MenuItemCard item={item} onRemove={removeMenuItem} />;
  };

  return (
    <>
      <Spacer />
      <FlatList
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

import React from 'react';

import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';

import MenuItemCard from 'components/MenuItemCard';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import {mockMenu} from 'data';
import {MenuItem} from 'models/MenuItem';
import {commonStyles, textStyles, useTheme} from 'styles';

interface Props {}

const stickyIndicies = [0];

const MenuComponent = (): React.ReactElement<Props> => {
  const menu = mockMenu;
  const theme = useTheme();

  const MenuHeader = () => (
    <View style={{backgroundColor: theme.backgroundColor}}>
      <Text style={styles.header}>{menu.title}</Text>
      <Spacer />
    </View>
  );

  const renderItem: ListRenderItem<MenuItem> = ({item}) => {
    return <MenuItemCard item={item} />;
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
});

export default MenuComponent;

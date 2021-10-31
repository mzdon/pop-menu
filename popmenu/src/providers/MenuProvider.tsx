import React from 'react';

import {v4 as uuid} from 'uuid';

import {mockMenu} from 'data';
import {Menu} from 'models/Menu';
import {MenuItem} from 'models/MenuItem';

type MenuItemData = Omit<MenuItem, 'id'> & {id?: string};

interface MenuContextValue {
  menu: Menu;
  addMenuItem: (item: MenuItemData) => void;
  removeMenuItem: (id: string) => void;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

type Props = React.PropsWithChildren<{}>;

const validateItem = (item: MenuItemData) => {
  const {title, imageUrl, price} = item;
  return !!(title && imageUrl && price);
};

const MenuProvider = ({children}: Props): React.ReactElement<Props> => {
  const [menu, setMenu] = React.useState({
    ...mockMenu,
    items: [...mockMenu.items],
  });

  const addMenuItem = React.useCallback((item: MenuItemData) => {
    setMenu(state => {
      if (!validateItem(item)) {
        throw new Error("The new MenuItem data doesn't look right!");
      }
      const nextState = {...state};
      nextState.items.push({
        id: uuid(),
        ...item,
      });
      return nextState;
    });
  }, []);

  const removeMenuItem = React.useCallback((id: string) => {
    setMenu(state => {
      const nextState = {...state};
      const itemIndex = nextState.items.findIndex(item => item.id === id);
      if (itemIndex === -1) {
        throw new Error(`The MenuItem id ${id} was not found on this Menu!`);
      }
      nextState.items.splice(itemIndex, 1);
      return nextState;
    });
  }, []);

  const userContextValue = {
    menu,
    addMenuItem,
    removeMenuItem,
  };

  return (
    <MenuContext.Provider value={userContextValue}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;

export const useMenuContext = (): MenuContextValue => {
  const menuContextValue = React.useContext(MenuContext);
  if (menuContextValue === null) {
    throw new Error(
      'No MenuContext value found. Was useMenuContext() called outside of a MenuProvider?',
    );
  }
  return menuContextValue;
};

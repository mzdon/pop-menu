import React from 'react';

import {v4 as uuid} from 'uuid';

import {getMockMenu} from 'data';
import {Menu} from 'models/Menu';
import {MenuItem} from 'models/MenuItem';

export type MenuItemData = Omit<MenuItem, 'id'> & {id?: string};

interface State {
  menu: Menu;
  editingItem: MenuItem | null;
}

export interface MenuContextValue {
  state: State;
  editMenuItem: (id: string) => void;
  cancelEdit: () => void;
  updateMenuItem: (item: MenuItemData) => void;
  saveMenuItem: () => void;
  addMenuItem: (item: MenuItemData) => void;
  removeMenuItem: (id: string) => void;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

type Props = React.PropsWithChildren<{}>;

const validateItem = (item: MenuItemData) => {
  const {title, imageUrl, price} = item;
  const valid = !!(title && imageUrl && price);
  if (!valid) {
    throw new Error("The Menu Item data doesn't look right!");
  }
  return item;
};

const selectMenuItemById = (state: State, id: string) => {
  const menuItem = state.menu.items.find(item => item.id === id);
  if (!menuItem) {
    throw new Error(`Menu Item with id ${id} not found!`);
  }
  return menuItem;
};

const selectEditingMenuItemIndex = (state: State) => {
  const {menu, editingItem} = state;
  if (editingItem === null) {
    throw new Error("We're not currently editing an item!");
  }
  const {id} = editingItem;
  const menuItemIndex = menu.items.findIndex(item => item.id === id);
  if (menuItemIndex === -1) {
    throw new Error(`Menu Item with id ${id} not found!`);
  }
  return menuItemIndex;
};

const MenuProvider = ({children}: Props): React.ReactElement<Props> => {
  const [state, setState] = React.useState<State>({
    menu: getMockMenu(),
    editingItem: null,
  });

  const editMenuItem = React.useCallback((id: string) => {
    setState(lastState => {
      const {editingItem} = lastState;
      if (editingItem !== null) {
        throw new Error("We're already edting an item!");
      }
      const menuItem = selectMenuItemById(lastState, id);
      return {
        ...lastState,
        editingItem: {...menuItem},
      };
    });
  }, []);

  const cancelEdit = React.useCallback(() => {
    setState(lastState => {
      const menuItemIndex = selectEditingMenuItemIndex(lastState);
      const {menu, editingItem} = lastState;
      if (editingItem === null) {
        throw new Error("We're not currently editing an item!");
      }
      return {
        menu: {
          ...menu,
          items: [
            ...menu.items.slice(0, menuItemIndex),
            editingItem,
            ...menu.items.slice(menuItemIndex + 1),
          ],
        },
        editingItem: null,
      };
    });
  }, []);

  const updateMenuItem = React.useCallback((item: MenuItemData) => {
    setState(lastState => {
      const menuItemIndex = selectEditingMenuItemIndex(lastState);
      const {menu} = lastState;
      const updatedItem = Object.assign(menu.items[menuItemIndex], item);
      return {
        ...lastState,
        menu: {
          ...menu,
          items: menu.items.splice(menuItemIndex, 1, updatedItem),
        },
      };
    });
  }, []);

  const saveMenuItem = React.useCallback(() => {
    setState(lastState => {
      const menuItemIndex = selectEditingMenuItemIndex(lastState);
      const item = lastState.menu.items[menuItemIndex];
      validateItem(item);
      return {...lastState, editingItem: null};
    });
  }, []);

  const addMenuItem = React.useCallback((item: MenuItemData) => {
    setState(lastState => {
      const validItem = validateItem(item);
      const menu = {...lastState.menu};
      menu.items.push({
        id: uuid(),
        ...validItem,
      });
      return {
        ...lastState,
        menu,
      };
    });
  }, []);

  const removeMenuItem = React.useCallback((id: string) => {
    setState(lastState => {
      const menu = {...lastState.menu};
      const itemIndex = menu.items.findIndex(item => item.id === id);
      if (itemIndex === -1) {
        throw new Error(`The MenuItem id ${id} was not found on this Menu!`);
      }
      menu.items.splice(itemIndex, 1);
      return {
        ...lastState,
        menu,
      };
    });
  }, []);

  const userContextValue = {
    state,
    editMenuItem,
    cancelEdit,
    updateMenuItem,
    saveMenuItem,
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

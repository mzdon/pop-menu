import {act, renderHook} from '@testing-library/react-hooks';

import {getMockMenu} from 'data';
import {Currency} from 'models/MonetaryValue';
import MenuProvider, {
  MenuItemData,
  useMenuContext,
} from 'providers/MenuProvider';

const wrapper = MenuProvider;

const setup = () => {
  const {result} = renderHook(() => useMenuContext(), {wrapper});
  return result;
};

const setupForEditing = (itemIndex: number = 0) => {
  const result = setup();
  act(() =>
    result.current.editMenuItem(result.current.state.menu.items[itemIndex].id),
  );
  return result;
};

const menuItem: MenuItemData = {
  imageUrl: 'https://someurl.com',
  title: 'Something cheezee this ways comes',
  description: 'With a description',
  price: {
    value: 1100,
    currency: Currency.USD,
  },
};

describe('MenuProvider', () => {
  it('should contain the mockMenu as initial state', () => {
    const result = setup();
    expect(result.current.state.menu).toEqual(getMockMenu());
  });

  it('should allow adding a new menu item', () => {
    const result = setup();
    act(() => result.current.addMenuItem(menuItem));
    const newItem = result.current.state.menu.items.find(
      item => (item.title = 'New Item'),
    );
    expect(newItem).toBeDefined();
  });

  it('should allow removing an item by id', () => {
    const mockMenu = getMockMenu();
    const result = setup();
    act(() => result.current.removeMenuItem(mockMenu.items[0].id));
    expect(result.current.state.menu.items).toHaveLength(
      mockMenu.items.length - 1,
    );
  });

  it('should allow setting an item to edit', () => {
    const result = setupForEditing();
    // equal but not the same object
    expect(result.current.state.editingItem).toEqual(
      result.current.state.menu.items[0],
    );
    expect(result.current.state.editingItem).not.toBe(
      result.current.state.menu.items[0],
    );
  });

  it('should allow updating the item being edited directly on the menu', () => {
    const editedItemIndex = 0;
    const result = setupForEditing(editedItemIndex);
    act(() => result.current.updateMenuItem(menuItem));
    const item = result.current.state.menu.items[editedItemIndex];
    expect(item.title).toBe(menuItem.title);
    expect(item.description).toBe(menuItem.description);
    expect(item.imageUrl).toBe(menuItem.imageUrl);
    expect(item.price.value).toBe(menuItem.price.value);
  });

  it('should allow saving an edited item', () => {
    const editedItemIndex = 0;
    const result = setupForEditing(editedItemIndex);
    act(() => result.current.updateMenuItem(menuItem));
    act(() => result.current.saveMenuItem());
    // editingItem is null
    expect(result.current.state.editingItem).toBe(null);
    // changes persist
    const item = result.current.state.menu.items[editedItemIndex];
    expect(item.title).toBe(menuItem.title);
    expect(item.description).toBe(menuItem.description);
    expect(item.imageUrl).toBe(menuItem.imageUrl);
    expect(item.price.value).toBe(menuItem.price.value);
  });

  it('should allow cancelling and rewinding edits to an edited item', () => {
    const editedItemIndex = 0;
    const result = setupForEditing(editedItemIndex);
    act(() => result.current.updateMenuItem(menuItem));
    expect(result.current.state.menu.items[editedItemIndex].title).toBe(
      menuItem.title,
    );
    act(() => result.current.cancelEdit());
    // editing item is null
    expect(result.current.state.editingItem).toBe(null);
    // changes rewind
    const originalItem = getMockMenu().items[editedItemIndex];
    const item = result.current.state.menu.items[editedItemIndex];
    expect(item.title).toBe(originalItem.title);
  });

  describe('should throw an error if', () => {
    it('a new menu item is missing data', () => {
      const result = setup();
      const expectError = (data: MenuItemData) => {
        try {
          result.current.addMenuItem(data);
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
        }
      };
      act(() => {
        expectError({
          ...menuItem,
          imageUrl: '',
        });
        expectError({
          ...menuItem,
          title: '',
        });
        expectError({
          ...menuItem,
          price: {
            ...menuItem.price,
            value: 0,
          },
        });
      });
    });

    it('the item to edit is not found', () => {
      const result = setup();
      act(() => {
        try {
          result.current.editMenuItem('not-real-id');
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
        }
      });
    });

    test.each([['updateMenuItem'], ['cancelEdit'], ['saveMenuItem']])(
      '%s is called but no item is being edited',
      fn => {
        try {
          const result = setup();
          act(() => {
            // @ts-ignore
            result.current[fn](menuItem);
          });
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
        }
      },
    );

    test.each([['updateMenuItem'], ['cancelEdit'], ['saveMenuItem']])(
      '%s is called but the item being edited is not found',
      fn => {
        try {
          const result = setup();
          result.current.state.editingItem = {...menuItem, id: 'fake-id'};
          act(() => {
            // @ts-ignore
            result.current[fn](menuItem);
          });
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
        }
      },
    );
  });
});

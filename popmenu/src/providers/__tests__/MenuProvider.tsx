import {act, renderHook} from '@testing-library/react-hooks';

import {mockMenu} from 'data';
import {Currency} from 'models/MonetaryValue';
import MenuProvider, {useMenuContext} from 'providers/MenuProvider';

const wrapper = MenuProvider;

const setup = () => {
  const {result} = renderHook(() => useMenuContext(), {wrapper});
  return result;
};

describe('MenuProvider', () => {
  it('should contain the mockMenu as initial state', () => {
    const result = setup();
    expect(result.current.menu).toEqual(mockMenu);
  });

  it('should allow adding a new menu item', () => {
    const result = setup();
    act(() =>
      result.current.addMenuItem({
        imageUrl: 'https://someurl.com',
        title: 'New Item',
        description: 'With a description',
        price: {
          value: 1100,
          currency: Currency.USD,
        },
      }),
    );
    const newItem = result.current.menu.items.find(
      item => (item.title = 'New Item'),
    );
    expect(newItem).toBeDefined();
  });

  it('should allow removing an item by id', () => {
    const result = setup();
    act(() => result.current.removeMenuItem(mockMenu.items[0].id));
    expect(result.current.menu.items).toHaveLength(mockMenu.items.length - 1);
  });
});

import {renderHook} from '@testing-library/react-hooks';

import {mockMenu} from 'data';
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
});

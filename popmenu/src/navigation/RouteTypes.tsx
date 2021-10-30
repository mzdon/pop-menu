import {ParamListBase} from '@react-navigation/routers';
import {StackNavigationProp} from '@react-navigation/stack';

export const MENU = 'MenuScreen';
export const ADD_MENU_ITEM = 'AddMenuItemScreen';

export interface RootStackParamList extends ParamListBase {
  MenuScreen: undefined;
  AddMenuItemScreen: undefined;
}

export type MenuScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MenuScreen'
>;

export type AddMenuItemScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddMenuItemScreen'
>;

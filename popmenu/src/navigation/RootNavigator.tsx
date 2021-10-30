import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AddMenuItemScreen from 'screens/AddMenuItemScreen';
import MenuScreen from 'screens/MenuScreen';
import {useTheme} from 'styles';
import {ADD_MENU_ITEM, MENU} from './RouteTypes';
import MenuProvider from 'providers/MenuProvider';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const theme = useTheme();

  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: theme.backgroundColor},
            headerTitleStyle: {color: theme.textColor},
            headerTintColor: theme.ctaColor,
            cardStyle: {backgroundColor: theme.backgroundColor},
          }}>
          <Stack.Screen name={MENU} component={MenuScreen} />
          <Stack.Screen name={ADD_MENU_ITEM} component={AddMenuItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default RootNavigator;

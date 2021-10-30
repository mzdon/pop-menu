import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import Menu from 'Menu';
import {useTheme, commonStyles} from 'styles';

const App = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[commonStyles.flex1, {backgroundColor: theme.backgroundColor}]}>
      <StatusBar barStyle={theme.isDark ? 'light-content' : 'dark-content'} />
      <Menu />
    </SafeAreaView>
  );
};

export default App;

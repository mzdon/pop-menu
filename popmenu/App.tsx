import React from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import RootNavigator from 'navigation/RootNavigator';
import {useTheme, commonStyles} from 'styles';

const App = () => {
  const theme = useTheme();

  const rootStyle = [
    commonStyles.flex1,
    {backgroundColor: theme.backgroundColor},
  ];

  return (
    <SafeAreaView style={rootStyle}>
      <KeyboardAvoidingView
        style={rootStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <StatusBar barStyle={theme.isDark ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;

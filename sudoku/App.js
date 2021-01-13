import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack'
import { Home, Game, Finish } from './src/screens';
import store from './src/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Game' component={Game} />
          <Stack.Screen name='Finish' component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

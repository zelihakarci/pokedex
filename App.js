/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import DetailScreen from './src/screens/DetailScreen';
import CatchedPokemons from './src/screens/CatchedPokemons';
import store from './src/redux/store';
import {getAsyncStoragePokemons} from './src/redux/pokemon/api';

const Stack = createStackNavigator();
const App = () => {
 
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={'Home'} component={Home} />
          <Stack.Screen name={'DetailScreen'} component={DetailScreen} />
          <Stack.Screen name={'CatchedPokemons'} component={CatchedPokemons} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

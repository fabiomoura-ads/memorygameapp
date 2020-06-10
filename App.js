import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home'
import Game from './src/pages/Game'
import Player from './src/pages/Player'
import Cards from './src/pages/Cards'
import PlayerNormal from './src/pages/PlayerNormal'
import Help from './src/pages/Help'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(245, 206, 66)',
    background: 'rgb(232, 100, 60)'
  },
};

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f47100',
          },
          headerTintColor: '#ffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="Player" component={Player} options={{ title: 'Modo Competição' }} />
        <Stack.Screen name="Cards" component={Cards} options={{ title: 'Opções do Jogo' }} />
        <Stack.Screen name="Game" component={Game} options={{ title: 'Memorizze - Jogue!' }} />
        <Stack.Screen name="PlayerNormal" component={PlayerNormal} options={{ title: 'Opções do Jogo' }} />
        <Stack.Screen name="Help" component={Help} options={{ title: 'Sobre o Jogo' }} />

      </Stack.Navigator>

    </NavigationContainer >
  );
}

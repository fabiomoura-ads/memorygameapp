import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home'
import Game from './src/pages/Game'

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="Game" component={Game} options={{ title: 'Game' }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    alignItems: "center",
  },
  form: {
    padding: 8,
    height: 80,
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  input: {
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },
  botton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 4,
    marginLeft: 10,
  },
  containerNewGame: {
    flex: 0.05,
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#eee",
    alignItems: "center",
    borderColor: "#eee",
    borderWidth: 2,
    borderRadius: 40
  },
  textNewGame: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

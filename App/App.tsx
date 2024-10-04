import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen.tsx';
import LoginScreen from './Screens/LoginScreen.tsx';
import TestScreen from './Screens/TestScreen.tsx';
import MBScreen from './Screens/MBScreen.tsx'

// Define the type for your navigation stack
type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
  MB: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Pass the component directly */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MB" component={MBScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

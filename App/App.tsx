import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen.tsx';
import LoginScreen from './Screens/LoginScreen.tsx';
import TestScreen from './Screens/TestScreen.tsx';

import { NativeStackScreenProps } from '@react-navigation/native-stack';  // Import types

// Define the type for your navigation stack
type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
};

// Type the props used by the screens
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home 123'>;
type TestScreenProps = NativeStackScreenProps<RootStackParamList, 'Test'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Properly type the props in the wrapper function */}
        <Stack.Screen
          name="Home"
          component={(props: HomeScreenProps) => <HomeScreen {...props} />}
        />
        <Stack.Screen
          name="Test"
          component={(props: TestScreenProps) => <TestScreen {...props} />}
        />
        <Stack.Screen
          name="Home"
          component={(props: LoginScreenProps) => <LoginScreen {...props} />}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen.tsx';
import LoginScreen from './Screens/LoginScreen.tsx';
import TestScreen from './Screens/TestScreen.tsx';
import MBScreen from './Screens/MBScreen.tsx';
import EventScreen from './Screens/EventScreen.tsx';
import SalesScreen from './Screens/SalesScreen.tsx';
import MapsScreen from './Screens/MapScreen.tsx';
import MBPostScreen from './Screens/MBPostScreen.tsx';
import SignUp from './Screens/SignUpScreen.tsx';
import EventPost from './Screens/EventPostScreen.tsx';
import SalesPost from './Screens/SalesPostScreen.tsx';
import SalesCommentScreen from './Screens/SalesCommentScreen.tsx'; // Correct the import

type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
  MB: undefined;
  Event: undefined;
  Sales: undefined;
  Maps: undefined;
  MBPost: undefined;
  SignUp: undefined;
  EventPost: undefined;
  SalesPost: undefined;
  SComment: { parentSalesId: number; heading: string; content: string; image_url: string }; // Correct the params
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MB" component={MBScreen} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="Sales" component={SalesScreen} />
        <Stack.Screen name="Maps" component={MapsScreen} />
        <Stack.Screen name="MBPost" component={MBPostScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="EventPost" component={EventPost} />
        <Stack.Screen name="SalesPost" component={SalesPost} />
        <Stack.Screen name="SComment" component={SalesCommentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

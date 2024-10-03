import React from 'react';
import { Button, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';  // Import the type

// Define the type for your navigation stack
type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
};
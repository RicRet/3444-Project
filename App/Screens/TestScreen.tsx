import React from 'react';
import { Button, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';  // Import the type

// Define the type for your navigation stack
type RootStackParamList = {
  Home: undefined;
  Test: undefined;
};

// Define the props type for the TestScreen
type Props = NativeStackScreenProps<RootStackParamList, 'Test'>;

const TestScreen = ({ navigation }: Props) => {   // Use the typed Props here
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Test Screen</Text>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default TestScreen;

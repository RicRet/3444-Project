import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the type for your navigation stack
type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
  MB: undefined;
};

// Define the props type for the HomeScreen
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {   
  return (
    <View style={styles.container}>
      {/* Heading Text */}
      <Text style={styles.heading}>Eagle Eye</Text>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('MB')}
        >
          <Text style={styles.buttonText}>Go to Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login/Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Optional padding for better spacing on small screens
    backgroundColor: '#fff', // Optional: White background for better contrast
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40, // Adjusts the distance from the top of the screen
    marginBottom: 20, // Space between the heading and the buttons
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%', // Adjust the button container width to center the buttons
    justifyContent: 'space-around', // Space the buttons evenly
    alignItems: 'center',
  },
  customButton: {
    backgroundColor: '#119b28', // Custom button color
    padding: 15, // Padding inside the button
    borderRadius: 10, // Rounded corners for the button
    alignItems: 'center',
    marginVertical: 10, // Adds vertical space between buttons
    width: '100%', // Ensure buttons take up the full width of the container
  },
  buttonText: {
    color: '#fff', // White text color
    fontWeight: 'bold',
    fontSize: 16, // Adjust text size for visibility
  },
});

export default HomeScreen;

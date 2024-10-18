import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios'; // Import axios for API calls

// Define the type for your navigation stack
type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
  MB: undefined;
  Event: undefined;
  Sales : undefined;
  Maps: undefined;
  SignUp: undefined;
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login
  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await axios.post('http://10.125.253.98:5000/api/users/login', { email, password });
        if (response.data.user) {
          Alert.alert('Success', 'Logged in successfully');
          navigation.navigate('Home'); // Redirect to Home on successful login
        }
      } catch (error) {
        Alert.alert('Error', 'Login failed. Please check your credentials.');
      }
    } else {
      Alert.alert('Error', 'Please enter both email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Login</Text>
        <View style={styles.underline} />
      </View>
      <View style={styles.inputs}>
        <View style={styles.input}>
          <TextInput
            placeholder="Student Email"
            style={styles.textInput}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <Text style={styles.forgotPassword}>
        Forgot Password? <Text style={styles.clickHere}>Click Here!</Text>
      </Text>
      <View style={styles.submitContainer}>
        <TouchableOpacity style={styles.submit} onPress={handleLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submit}
          onPress={() => navigation.navigate('SignUp')} // Navigate to SignUp screen
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  underline: {
    height: 2,
    width: '100%',
    backgroundColor: '#119b28',
    marginTop: 5,
  },
  inputs: {
    marginVertical: 20,
  },
  input: {
    marginBottom: 15,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  forgotPassword: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#797979',
  },
  clickHere: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  submitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submit: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});

export default Login;

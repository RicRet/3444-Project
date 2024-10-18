import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle sign up
  const handleSignUp = async () => {
    if (username && email && password) {
      try {
        const response = await axios.post('http://10.125.253.98:5000/api/users', {
          username,
          email,
          password
        });
        if (response.data) {
          Alert.alert('Success', 'Sign up successful. You can now log in.');
        }
      } catch (error) {
        Alert.alert('Error', 'Sign up failed.');
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Sign Up</Text>
        <View style={styles.underline} />
      </View>
      <View style={styles.inputs}>
        <View style={styles.input}>
          <TextInput
            placeholder="Username"
            style={styles.textInput}
            value={username}
            onChangeText={setUsername}
          />
        </View>
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
      <View style={styles.submitContainer}>
        <TouchableOpacity style={styles.submit} onPress={handleSignUp}>
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
  submitContainer: {
    alignItems: 'center',
  },
  submit: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
});

export default SignUp;

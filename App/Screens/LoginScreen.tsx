import React, { useState } from 'react';
import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // Import the type

// Define the type for your navigation stack
type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
  MB: undefined;
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [action, setAction] = useState("Login");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{action}</Text>
        <View style={styles.underline} />
      </View>
      <View style={styles.inputs}>
        {action === "Login" ? null : (
          <View style={styles.input}>
            <TextInput placeholder="EUID" style={styles.textInput} />
          </View>
        )}
        <View style={styles.input}>
          <TextInput placeholder="Student Email" style={styles.textInput} keyboardType="email-address" />
        </View>
        <View style={styles.input}>
          <TextInput placeholder="Password" style={styles.textInput} secureTextEntry={true} />
        </View>
      </View>
      {action === "Sign Up" ? null : (
        <Text style={styles.forgotPassword}>
          Forgot Password? <Text style={styles.clickHere}>Click Here!</Text>
        </Text>
      )}
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={action === "Login" ? styles.submitGray : styles.submit}
          onPress={() => setAction("Sign Up")}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={action === "Sign Up" ? styles.submitGray : styles.submit}
          onPress={() => setAction("Login")}
        >
          <Text>Login</Text>
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
    color: '#797979'
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
  submitGray: {
    backgroundColor: '#EAEAEA',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});

export default Login;

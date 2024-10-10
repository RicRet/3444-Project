import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
  MB: undefined;
  Event: undefined;
  Sales : undefined;
  Maps: undefined;
  Post: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Post'>;

const PostScreen: React.FC = () => {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.heading}>Create a New Post</Text>
  
          {/* Title Input */}
          <Text style={styles.label}>Post Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your post title"
            placeholderTextColor="#999"
          />
  
          {/* Description Input */}
          <Text style={styles.label}>Post Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter the details of your post"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
  
          {/* Attach Image Button */}
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.buttonText}>Attach Image</Text>
          </TouchableOpacity>
  
          {/* Post Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Submit Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f8f9fa',
    },
    content: {
      width: '90%',
      maxWidth: 600,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#119B28',
      textAlign: 'center',
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
      color: '#333',
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      color: '#333',
      marginBottom: 20,
      backgroundColor: '#f8f8f8',
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    button: {
      backgroundColor: '#119B28',
      paddingVertical: 12,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 10, // Add some space between buttons
    },
    attachButton: {
      backgroundColor: '#007BFF', // Different color for attach button
      paddingVertical: 12,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 20, // Add some space below
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
  export default PostScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
  MB: undefined;
  Event: undefined;
  Sales: undefined;
  Maps: undefined;
  MBPost: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'MBPost'>;

const createPost = async (heading: string, content: string, imageUrl: string) => {
  try {
    const response = await axios.post('http://192.168.1.32:5000/api/dbposts', {
      heading,
      content,
      ownerId: '1',  // Hardcoded Owner ID
      imageUrl,
    });

    const successMessage = response.data.message || 'Post created successfully!';
    
    Alert.alert('Success', successMessage);

    return true;
  } catch (error) {
    Alert.alert('Error', 'Failed to create post.');
    return false;
  }
};

const MBPost: React.FC<Props> = () => {
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    if (!heading || !content || !imageUrl) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    await createPost(heading, content, imageUrl);
    setHeading('');
    setContent('');
    setImageUrl('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Create a New Post</Text>

        {/* Heading Input */}
        <Text style={styles.label}>Post Heading</Text>
        <TextInput
          style={styles.input}
          placeholder="Heading"
          value={heading}
          onChangeText={setHeading}
        />

        {/* Content Input */}
        <Text style={styles.label}>Post Content</Text>
        <TextInput
          style={styles.input}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
        />

        {/* Attach Image URL Input */}
        <Text style={styles.label}>Attach Image URL</Text>
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        {/* Post Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
    bottom: 0,
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
  button: {
    backgroundColor: '#119B28',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MBPost;

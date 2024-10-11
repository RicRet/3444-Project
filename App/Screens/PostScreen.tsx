import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

type RootStackParamList = {
<<<<<<< HEAD
  Home: undefined;
=======
    Home: undefined;
>>>>>>> 2aa1171c3a2fc4314c82dcf54690d05f1e13cc47
  Test: undefined;
  Login: undefined;
  MB: undefined;
  Event: undefined;
<<<<<<< HEAD
  Sales: undefined;
  Maps: undefined;
  Post: undefined;
};
=======
  Sales : undefined;
  Maps: undefined;
  Post: undefined;
  SignUp: undefined;
  };
>>>>>>> 2aa1171c3a2fc4314c82dcf54690d05f1e13cc47

type Props = NativeStackScreenProps<RootStackParamList, 'Post'>;

const createPost = async (heading: string, content: string, ownerId: string, imageUrl: string) => {
  try {
    const response = await axios.post('http://192.168.1.32:5000/api/dbposts', {
      heading,
      content,
      ownerId,
      imageUrl,
    });

    // Check if response.data is an object or a string and handle accordingly
    const successMessage = response.data.message || 'Post created successfully!';
    
    Alert.alert('Success', successMessage);

    // Optionally navigate to another screen after posting
    return true; // Indicate successful post for further action
  } catch (error) {
    Alert.alert('Error', 'Failed to create post.');
    return false; // Indicate failure for further action
  }
};



const PostScreen: React.FC<Props> = () => {
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [ownerId, setOwnerId] = useState(''); // Assuming ownerId will be provided
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    if (!heading || !content || !ownerId || !imageUrl) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    await createPost(heading, content, ownerId, imageUrl);
    setHeading('');
    setContent('');
    setOwnerId(''); // Resetting ownerId after submission
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

        {/* Owner ID Input */}
        <Text style={styles.label}>Owner ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Owner ID"
          value={ownerId}
          onChangeText={setOwnerId}
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

<<<<<<< HEAD
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

export default PostScreen;
=======
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.heading}>Create a New Post</Text>
  
          {/* Title Input */}
          <Text style={styles.label}>Post Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
  
          {/* Description Input */}
          <Text style={styles.label}>Post Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
  
          {/* Attach Image Button */}
          <Text style={styles.label}>Attach image url</Text>
          <TextInput
            style={styles.input}
            placeholder="url"
            value={image}
            onChangeText={setImage}
          />
  
          {/* Post Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleSubmit}>Submit Post</Text>
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
>>>>>>> 2aa1171c3a2fc4314c82dcf54690d05f1e13cc47

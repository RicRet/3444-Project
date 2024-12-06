import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

type RootStackParamList = {
  MBComment: { parentPostId: number; heading: string; content: string; image_url: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'MBComment'>;

type Comment = {
  post_id: number;
  content: string;
  owner_id: number;
  post_date: string;
};

const MBCommentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { parentPostId, heading, content, image_url } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [replyText, setReplyText] = useState<string>(''); // State to handle the reply input

  // Fetch comments for the post on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://192.168.1.32:5000/api/dbReplies/${parentPostId}/replies`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [parentPostId]);

  const handleReplySubmit = () => {
    if (replyText.trim().length === 0) {
      Alert.alert('Error', 'Reply cannot be empty.');
      return;
    }
    // Simulate a successful submission
    Alert.alert('Reply Submitted', `Your reply: "${replyText}"`);
    setReplyText(''); // Clear the input field after submission
  };

  // Show a loading spinner while fetching comments
  if (loading) {
    return <ActivityIndicator size="large" color="#119B28" />;
  }

  // Validate the image_url before using it
  const validImageUrl = image_url && typeof image_url === 'string' && image_url.startsWith('http');

  return (
    <View style={styles.container}>
      {/* Only render the image if it's a valid URL */}
      {validImageUrl ? (
        <Image source={{ uri: image_url }} style={styles.postImage} />
      ) : (
        <Text style={styles.noImage}>No image available</Text>
      )}

      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.content}>{content}</Text>

      {/* Comments List */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.post_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <Text style={styles.commentContent}>{item.content}</Text>
            <Text style={styles.commentAuthor}>Posted by User {item.owner_id}</Text>
            <Text style={styles.commentDate}>{new Date(item.post_date).toLocaleString()}</Text>
          </View>
        )}
      />

      {/* Reply Input Section */}
      <View style={styles.replyContainer}>
        <TextInput
          style={styles.replyInput}
          placeholder="Write a reply..."
          value={replyText}
          onChangeText={setReplyText}
        />
        <Button title="Submit" onPress={handleReplySubmit} color="#119B28" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 15,
  },
  noImage: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#119B28',
  },
  content: {
    color: '#555',
    marginBottom: 20,
  },
  commentCard: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  commentContent: {
    color: '#333',
    marginBottom: 5,
  },
  commentAuthor: {
    fontSize: 14,
    color: '#117328',
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  replyInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
});

export default MBCommentScreen;

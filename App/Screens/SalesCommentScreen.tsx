import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

type RootStackParamList = {
  SComment: { parentSalesId: number; heading: string; content: string; image_url: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'SComment'>;

type Comment = {
  reply_id: number;
  content: string;
  owner_id: number;
  post_date: string;
};

const SalesCommentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { parentSalesId, heading, content, image_url } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch comments for the post on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://192.168.1.32:5000/api/salesReplies/${parentSalesId}/replies`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [parentSalesId]);

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
        keyExtractor={(item) => item.reply_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <Text style={styles.commentContent}>{item.content}</Text>
            <Text style={styles.commentDate}>{new Date(item.post_date).toLocaleString()}</Text>
          </View>
        )}
      />
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
  commentDate: {
    fontSize: 12,
    color: '#888',
  },
});

export default SalesCommentScreen;

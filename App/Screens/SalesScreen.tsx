// SalesScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

type RootStackParamList = {
  Sales: undefined;
  SComment: { parentSalesId: number; heading: string; content: string; image_url: string }; // Pass image_url here
};

type Props = NativeStackScreenProps<RootStackParamList, 'Sales'>;

type Post = {
  post_id: number;
  heading: string;
  content: string;
  image_url: string; // Ensure image_url is included in the Post type
};

const SalesScreen: React.FC<Props> = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch sales posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://192.168.1.32:5000/api/sales/recent');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching sales posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Show a loading spinner while fetching posts
  if (loading) {
    return <ActivityIndicator size="large" color="#119B28" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sales Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.post_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postCard}
            onPress={() =>
              navigation.navigate('SComment', {
                parentSalesId: item.post_id, // Pass parentSalesId to the next screen
                heading: item.heading,
                content: item.content,
                image_url: item.image_url, // Pass image_url to the next screen
              })
            }
          >
            {item.image_url && (
              <Image source={{ uri: item.image_url }} style={styles.postImage} />
            )}
            <Text style={styles.postHeading}>{item.heading}</Text>
            <Text numberOfLines={2} style={styles.postContent}>
              {item.content}
            </Text>
          </TouchableOpacity>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#119B28',
    textAlign: 'center',
  },
  postCard: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  postHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  postContent: {
    color: '#555',
  },
});

export default SalesScreen;

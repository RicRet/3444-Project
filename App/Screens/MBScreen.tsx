import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Image, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

type RootStackParamList = {
  MB: undefined;
  MBComment: { parentPostId: number; heading: string; content: string; image_url: string };
  MBPost: undefined; // Add the MBPost screen type
};

type Props = NativeStackScreenProps<RootStackParamList, 'MB'>;

type Post = {
  post_id: number;
  heading: string;
  content: string;
  image_url: string;
};

const MBScreen: React.FC<Props> = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Add the "Post" button to the top-right corner
    navigation.setOptions({
      headerRight: () => (
        <Button title="Post" onPress={() => navigation.navigate('MBPost')} />
      ),
    });
  }, [navigation]);

  // Fetch MB posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://192.168.1.32:5000/api/dbposts/recent?limit=10');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching MB posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#119B28" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Message Board Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.post_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postCard}
            onPress={() =>
              navigation.navigate('MBComment', {
                parentPostId: item.post_id,
                heading: item.heading,
                content: item.content,
                image_url: item.image_url,
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

export default MBScreen;

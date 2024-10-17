import React, { useEffect, useState } from 'react';
import { Image, Button, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';

type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
  MB: undefined;
  Event: undefined;
  Sales: undefined;
  Maps: undefined;
  Post: undefined;
  SignUp: undefined;
};

type MBScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MB'>;

type Topic = {
  post_id: number;
  heading: string;
  content: string;
  owner_id: number;
  post_date: string;
  image_url: string; // Added the image_url property
};

const MBScreen: React.FC = () => {
  const navigation = useNavigation<MBScreenNavigationProp>();
  const [topics, setTopics] = useState<Topic[]>([]); // Store the fetched posts
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Post" onPress={() => navigation.navigate('MBPost')} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    // Fetch recent posts from the backend
    const fetchRecentPosts = async () => {
      try {
        const response = await axios.get('http://192.168.1.32:5000/api/dbposts/recent?limit=10'); // Update with your actual API URL
        setTopics(response.data); // Set the fetched posts
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setLoading(false); // Stop loading after the request completes
      }
    };

    fetchRecentPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#119B28" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Forum Topics</Text>

        {topics.length > 0 ? (
          topics.map((topic) => (
            <View key={topic.post_id} style={styles.topicCard}>
              <View style={styles.imageContainer}>
                {topic.image_url && (
                  <Image source={{ uri: topic.image_url }} style={styles.topicImage} resizeMode="cover" />
                )}
                <Text style={styles.imageOverlayText}>{topic.heading}</Text>
              </View>

              <View style={styles.topicDetails}>
                <TouchableOpacity>
                  <Text style={styles.topicTitle}>{topic.heading}</Text>
                </TouchableOpacity>
                <Text style={styles.topicInfo}>
                  Posted by <Text style={styles.topicAuthor}>{topic.owner_id}</Text> | {topic.content} | Last activity: {topic.post_date}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No topics available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  topicCard: {
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '90%',
  },
  imageContainer: {
    position: 'relative',
  },
  topicImage: {
    width: '100%',
    height: 200,
  },
  topicDetails: {
    padding: 15,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topicInfo: {
    fontSize: 14,
    color: '#6c757d',
  },
  topicAuthor: {
    fontWeight: 'bold',
  },
  imageOverlayText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
});

export default MBScreen;

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
  SignUp: undefined;
  EventPost: undefined;
};

type EventScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Event'>;

type EventPost = {
  post_id: number;
  heading: string;
  content: string;
  owner_id: number;
  post_date: string;
  image_url: string;
};

const EventScreen: React.FC = () => {
  const navigation = useNavigation<EventScreenNavigationProp>();
  const [events, setEvents] = useState<EventPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Post" onPress={() => navigation.navigate('EventPost')} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchEventPosts = async () => {
      try {
        const response = await axios.get('http://192.168.1.32:5000/api/events/recent?limit=10');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching event posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#119B28" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Recent Event Posts</Text>

        {events.length > 0 ? (
          events.map((event) => (
            <View key={event.post_id} style={styles.eventCard}>
              <View style={styles.imageContainer}>
                {event.image_url && (
                  <Image source={{ uri: event.image_url }} style={styles.eventImage} resizeMode="cover" />
                )}
                <Text style={styles.imageOverlayText}>{event.heading}</Text>
              </View>

              <View style={styles.eventDetails}>
                <TouchableOpacity>
                  <Text style={styles.eventTitle}>{event.heading}</Text>
                </TouchableOpacity>
                <Text style={styles.eventInfo}>
                  Posted by <Text style={styles.eventAuthor}>{event.owner_id}</Text> | {event.content} | Last activity: {event.post_date}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No event posts available.</Text>
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
  eventCard: {
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
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventDetails: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventInfo: {
    fontSize: 14,
    color: '#6c757d',
  },
  eventAuthor: {
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

export default EventScreen;

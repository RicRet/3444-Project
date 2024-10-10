import React, { useEffect } from 'react';
import { Image, Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

type EventScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Event'>;

const EventScreen: React.FC = () => {
  const navigation = useNavigation<EventScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <Button title="Post" onPress={() => navigation.navigate('Post')} />
      ),
    });
  }, [navigation]);

  // Dummy topics
  const topics = [
    {
      id: 1,
      title: 'Join us for trivia night',
      author: 'Jim Tims',
      replies: 5,
      lastActivity: '2 hours ago',
      imageUrl: 'https://th.bing.com/th/id/OIP.jr5YuTd0r4ST5asb7hEtvQHaLc?w=201&h=310&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    },
    {
      id: 2,
      title: 'Join us for Midterm Snacks!',
      author: 'John Johnsons',
      replies: 8,
      lastActivity: '1 hour ago',
      imageUrl: 'https://localist-images.azureedge.net/photos/46993750257807/huge/05ef1ffc0391a9d04a4efe3625b7c5551d40b6ff.jpg',
    },
    {
      id: 3,
      title: 'Monthly Mobile Food Pantry!',
      author: 'Smith Smithsons',
      replies: 42,
      lastActivity: '1 hour ago',
      imageUrl: 'https://localist-images.azureedge.net/photos/47110919604249/huge/321fa456598ae5db29fb6783f713b36656345aa9.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Recent Posts</Text>

        {/* Topic List */}
        {topics.map((topic) => (
          <View key={topic.id} style={styles.topicCard}>
            {/* Image with text overlay */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: topic.imageUrl }} style={styles.topicImage} resizeMode="cover" />
              <Text style={styles.imageOverlayText}>{topic.title}</Text>
            </View>

            {/* Topic Details */}
            <View style={styles.topicDetails}>
              <TouchableOpacity>
                <Text style={styles.topicTitle}>{topic.title}</Text>
              </TouchableOpacity>
              <Text style={styles.topicInfo}>
                Posted by <Text style={styles.topicAuthor}>{topic.author}</Text> | {topic.replies} comments | Last activity: {topic.lastActivity}
              </Text>
            </View>
          </View>
        ))}
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
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#119B28',
    textAlign: 'center',
  },
  topicCard: {
    flexDirection: 'column',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  topicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  imageOverlayText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  topicDetails: {
    flex: 1,
    marginTop: 10,
  },
  topicTitle: {
    color: '#119B28',
    fontSize: 18,
    marginBottom: 5,
  },
  topicInfo: {
    color: '#777',
  },
  topicAuthor: {
    fontWeight: 'bold',
    color: '#117328',
  },
});

export default EventScreen;

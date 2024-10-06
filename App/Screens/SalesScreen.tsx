import React, { useEffect } from 'react';
import { Image, Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
  MB: undefined;
  Event: undefined;
  Sales: undefined;
  Maps: undefined;
  Post: undefined;
};

type SalesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sales'>;

const SalesScreen: React.FC = () => {
  const navigation = useNavigation<SalesScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Post" onPress={() => navigation.navigate('Post')} />
      ),
    });
  }, [navigation]);

  // Dummy topics
  const topics = [
    {
      id: 1,
      title: 'Selling used Couch',
      author: 'Jim Tims',
      replies: 5,
      lastActivity: '2 hours ago',
      imageUrl: 'https://preview.redd.it/couch-that-guy-is-trying-to-sell-me-says-its-lightly-used-v0-f559mws6yfsb1.jpg?width=1080&crop=smart&auto=webp&s=6ae1382320005aa7af22ce5cc24da651d0a4ed40',
    },
    {
      id: 2,
      title: 'Anyone need a calculus textbook?',
      author: 'John Johnsons',
      replies: 8,
      lastActivity: '1 hour ago',
      imageUrl: 'https://preview.redd.it/calculus-early-transcendentals-textbook-for-sale-v0-07mwtyt2vgkd1.jpg?width=1080&crop=smart&auto=webp&s=02cdda8bcea6fb4974ac416053b61b79aa4977f1',
    },
    {
      id: 3,
      title: 'Math tutoring services, please call if interested',
      author: 'Smith Smithsons',
      replies: 42,
      lastActivity: '1 hour ago',
      imageUrl: 'https://th.bing.com/th/id/OIP.EOYrVYtrBoZ5I445yQOMsgHaFV?rs=1&pid=ImgDetMain',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Forum Topics</Text>

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

export default SalesScreen;

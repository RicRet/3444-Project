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

type MBScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MB'>;

const MBScreen: React.FC = () => {
  const navigation = useNavigation<MBScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Post" onPress={() => navigation.navigate('Post')} />
      ),
    });
  }, [navigation]);

  const topics = [
    {
      id: 1,
      title: 'Subleasing apartment for 2025-2026 for 43214 per month (utilities not included)',
      author: 'Jim Tims',
      replies: 5,
      lastActivity: '2 hours ago',
      imageUrl: 'https://preview.redd.it/ox3r5bnirafd1.jpeg?width=1080&crop=smart&auto=webp&s=efdc91b37713002c8e0227a5ac7084e319eb4955',
    },
    {
      id: 2,
      title: 'Dogs',
      author: 'John Johnsons',
      replies: 8,
      lastActivity: '1 hour ago',
      imageUrl: 'http://4.bp.blogspot.com/-W_91tkdkDQ8/T-BcpLwTkII/AAAAAAAADGA/JahAZqxAiX0/s1600/2-Cute-Puppies-1.jpeg',
    },
    {
      id: 3,
      title: 'Has anyone taken CS 420?',
      author: 'Smith Smithsons',
      replies: 42,
      lastActivity: '1 hour ago',
      imageUrl: 'https://i.pinimg.com/736x/0c/7b/a0/0c7ba0a7f5a817a2765147d9066c7122.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Forum Topics</Text>

        {topics.map((topic) => (
          <View key={topic.id} style={styles.topicCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: topic.imageUrl }} style={styles.topicImage} resizeMode="cover" />
              <Text style={styles.imageOverlayText}>{topic.title}</Text>
            </View>

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

export default MBScreen;

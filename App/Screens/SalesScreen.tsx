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
  Sales : undefined;
  Maps: undefined;
  SignUp: undefined;
  SalesPost: undefined;
};

type SalesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sales'>;

type SalePost = {
  post_id: number;
  heading: string;
  content: string;
  owner_id: number;
  post_date: string;
  image_url: string;
};

const SalesScreen: React.FC = () => {
  const navigation = useNavigation<SalesScreenNavigationProp>();
  const [sales, setSales] = useState<SalePost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <Button title="Post" onPress={() => navigation.navigate('SalesPost')} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchEventPosts = async () => {
      try {
        const response = await axios.get('http:/192.168.1.32:5000/api/sales/recent?limit=10');
        setSales(response.data);
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
        <Text style={styles.heading}>Sales Posts</Text>

        {sales.length > 0 ? (
          sales.map((sale) => (
            <View key={sale.post_id} style={styles.topicCard}>
              <View style={styles.imageContainer}>
                {sale.image_url && (
                  <Image source={{ uri: sale.image_url }} style={styles.topicImage} resizeMode="cover" />
                )}
                <Text style={styles.imageOverlayText}>{sale.heading}</Text>
              </View>

              <View style={styles.topicDetails}>
                <TouchableOpacity>
                  <Text style={styles.topicTitle}>{sale.heading}</Text>
                </TouchableOpacity>
                <Text style={styles.topicInfo}>
                  Posted by <Text style={styles.topicAuthor}>{sale.owner_id}</Text> | {sale.content} | Last activity: {sale.post_date}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No sales available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
    flex: 1,
    width: '100%', 
    justifyContent: 'flex-start',
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
  },
  topicImage: {
    width: '100%',
    height: '100%',
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
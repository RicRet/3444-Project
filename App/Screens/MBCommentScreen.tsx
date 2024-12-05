import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

type RootStackParamList = {
    Home: undefined;
    Test: undefined;
    Login: undefined;
    MB: undefined;
    Event: undefined;
    Sales: undefined;
    Maps: undefined;
    MBPost: undefined;
    MBComment: undefined;
  };

  type Props = NativeStackScreenProps<RootStackParamList, 'MBComment'>;

  type Comments = {
    owner_id: number;
    content: string;
    post_date: number;
    post_id: number;
  }

  const MBCommentScreen: React.FC = () => {
    const [mbcomments, setMBComments] = useState<Comments[]>([]);
    const [loading, setMBLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchMBComments = async () => {
        try {
          const response = await axios.get('mbcomments');
          setMBComments(response.data);
        } catch (error) {
          console.error('Error fetching comments:', error);
        } finally {
          setMBLoading(false);
        }
      };
  
      fetchMBComments();
    }, []);0
  
    if (loading) {
      return <ActivityIndicator size="large" color="#119B28" />;
    }
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.heading}>Comments</Text>
          {mbcomments.length > 0 ? (
            mbcomments.map((comment) => (
              <View key={comment.post_id} style={styles.commentCard}>
                  <Text style={styles.commentInfo}>
                    Posted by <Text style={styles.commentAuthor}>{comment.owner_id}</Text> | {comment.content} | Posted at: {comment.post_date}
                  </Text>
              </View>
            ))
          ) : (
            <Text>No Comments.</Text>
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
      commentCard: {
        flexDirection: 'column',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '100%',
      },
      commentInfo: {
        color: '#777',
      },
      commentAuthor: {
        fontWeight: 'bold',
        color: '#117328',
      },
    });

  export default MBCommentScreen;
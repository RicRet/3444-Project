import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  Login: undefined;
  MB: undefined;
  Event: undefined;
  Sales : undefined;
  Maps: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Maps'>;

const MapsScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Maps</Text>

      <View style={styles.mapContainer}>
        <Image
          source={{ uri: 'https://pbs.twimg.com/media/DTR1DWQW0AAOs30.jpg' }}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <Text style={styles.mapLabel}>UNT Main Campus</Text>
      </View>

      <View style={styles.mapContainer}>
        <Image
          source={require('../Assets/images/DPMap_1.jpg')}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <Text style={styles.mapLabel}>Discovery Park First Floor</Text>
      </View>

      <View style={styles.mapContainer}>
        <Image
          source={require('../Assets/images/DPMap2.jpg')}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <Text style={styles.mapLabel}>Discovery Park Second Floor</Text>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#119B28',
    textAlign: 'center',
  },
  mapContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mapLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default MapsScreen;

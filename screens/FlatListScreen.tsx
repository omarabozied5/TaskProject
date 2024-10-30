/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface User {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  company: string;
  photo: string;
}

const FlatListScreen = () => {
  const [data, setData] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://fake-json-api.mock.beeceptor.com/users',
      );
      const json: User[] = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={30}
          color="#189ab4"
          style={{ marginRight: 2 }}
        />,
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.photo }} style={styles.profileImage} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>Username: {item.username}</Text>
                <Text style={styles.details}>Phone: {item.phone}</Text>
                <Text style={styles.details}>Email: {item.email}</Text>
                <Text style={styles.details}>Address: {item.address}</Text>
                <Text style={styles.details}>Country: {item.country}</Text>
                <Text style={styles.details}>Company: {item.company}</Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});

export default FlatListScreen;

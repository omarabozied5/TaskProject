// UserCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface UserCardProps {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  company: string;
  photo: string;
  onPress: (id: number) => void; // Function to handle press events
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  username,
  phone,
  email,
  address,
  country,
  company,
  photo,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(id)}>
      <Image source={{ uri: photo }} style={styles.profileImage} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.details}>Username: {username}</Text>
        <Text style={styles.details}>Phone: {phone}</Text>
        <Text style={styles.details}>Email: {email}</Text>
        <Text style={styles.details}>Address: {address}</Text>
        <Text style={styles.details}>Country: {country}</Text>
        <Text style={styles.details}>Company: {company}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    alignSelf: 'center',
  },
  cardContent: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 12,
    color: '#666',
  },
});

export default UserCard;

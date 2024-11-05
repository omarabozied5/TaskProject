import React from 'react';
import { FlatList, View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import UserCard from '../components/UserCard'; // Import the UserCard component
import { fetchUsers } from '../config/api'; // Import the fetchUsers function
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // Import RootStackParamList
import { useNavigation } from '@react-navigation/native'; // Import for navigation

const FlatListScreen = () => {
  // Define navigation type
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { isLoading, data, error } = useQuery({
    queryKey: ['profiles'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <Text>Loading.....</Text>;
  if (error) return <Text>Something went wrong!!!</Text>;

  const handleUserPress = (id: number) => {
    navigation.navigate('UserDetail', { userId: id }); // Use the defined userId parameter
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UserCard
              id={item.id}
              name={item.name}
              username={item.username}
              phone={item.phone}
              email={item.email}
              address={item.address}
              country={item.country}
              company={item.company}
              photo={item.photo}
              onPress={handleUserPress}
            />
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
    marginTop: 10,
  },
});

export default FlatListScreen;

/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileScreenProps {
  navigation: {
    goBack: () => void;
  };
}

interface ImageData {
  id: string;
  source: any;
}

export default function ProfileScreen({}: ProfileScreenProps) {
  const navigation = useNavigation();
  type MediaType = 'photo' | 'video' | 'mixed';

  const [email, setEmail] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    getEmail();
  }, []);

  const handleLogOut = async () => {
    await AsyncStorage.removeItem('userEmail');
    navigation.goBack();
  };

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType,
      quality: 1,
    };
    launchCamera(options, (response) => {
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets &&
        response.assets.length > 0
      ) {
        setProfileImage(response.assets[0].uri ?? null);
      }
      setModalVisible(false);
    });
  };

  const openGallery = () => {
    const options = { mediaType: 'photo' as MediaType, quality: 1 };
    launchImageLibrary(options, (response) => {
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets &&
        response.assets.length > 0
      ) {
        setProfileImage(response.assets[0].uri ?? null);
      }
      setModalVisible(false);
    });
  };

  const handleUpdateProfile = () => {
    setModalVisible(true);
  };

  const images: ImageData[] = [
    { id: '1', source: require('../assets/images/1.jpg') },
    { id: '3', source: require('../assets/images/treka.jpg') },
    { id: '2', source: require('../assets/images/2.jpg') },
    { id: '5', source: require('../assets/images/22.jpg') },
    { id: '4', source: require('../assets/images/11.jpg') },
    { id: '6', source: require('../assets/images/33.jpg') },
    { id: '8', source: require('../assets/images/222.jpg') },
    { id: '7', source: require('../assets/images/111.jpg') },
    { id: '9', source: require('../assets/images/333.jpg') },
  ];

  const renderItem = ({ item }: ListRenderItemInfo<ImageData>) => (
    <View style={styles.imageContainer}>
      <Image source={item.source} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            profileImage ? { uri: profileImage } : require('../assets/me.png')
          }
          style={styles.profile}
        />
        <Text style={styles.email}>{email}</Text>
        {/* <Text style={styles.title}>OMAR ABOZEID</Text> */}
        <TouchableOpacity style={styles.btns} onPress={handleUpdateProfile}>
          <Text style={styles.socialText}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.follows}>
        <View style={styles.stat}>
          <Text style={styles.number}>100</Text>
          <Text style={styles.label}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number}>80</Text>
          <Text style={styles.label}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number}>150</Text>
          <Text style={styles.label}>Following</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btns}>
          <Text style={styles.socialText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logOutBtns} onPress={handleLogOut}>
          <Text style={styles.socialText}>LogOut</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatContainer}>
        <Text style={styles.postsTitle}>Posts</Text>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ flex: 1 }}
        />
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={openGallery}>
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonCansel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    marginTop: 10,
    alignItems: 'center',
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    color: '#8b1717',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 25,
    fontWeight: '800',
    color: '#8b1717',
    marginTop: 5,
  },
  follows: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 10,
  },
  stat: {
    alignItems: 'center',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '80%',
  },
  btns: {
    width: 150,
    alignItems: 'center',
    backgroundColor: '#5D8AA8',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logOutBtns: {
    width: 150,
    alignItems: 'center',
    backgroundColor: '#8b1717',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  socialText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  postsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },
  imageContainer: {
    margin: 5,
    width: 120,
    height: 500,
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },

  flatContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 1000,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#5D8AA8',
    borderRadius: 8,
  },
  modalButtonCansel: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#8b1717',
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

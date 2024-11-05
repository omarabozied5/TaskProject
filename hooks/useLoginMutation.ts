// hooks/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type LoginData = {
  email: string;
  password: string;
};

export function useLoginMutation(
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>,
) {
  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (variables) => {
      const response = await axios.post<LoginResponse>(
        'http://demo5037325.mockable.io/login',
        variables,
      );
      return response.data;
    },
    onError: (error) => {
      console.error('Login failed:', error);
      throw new Error('Invalid email or password');
    },
    onSuccess: async (data, variables) => {
      console.log('Login successful:', data);
      await AsyncStorage.setItem('userEmail', variables.email);
      navigation.navigate('Main');
    },
  });
}

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  Main: undefined;
  UserDetail: { userId: number };
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export interface LoginResponse {
  success: boolean;
  token: string;
}

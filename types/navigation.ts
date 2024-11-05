// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // types/navigation.ts
// export type RootStackParamList = {
//   Login: undefined;
//   Profile: undefined;
//   Main: undefined;
// };

// export type LoginScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Login'
// >;

// export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

// types/navigation.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  Main: undefined;
  UserDetail: { userId: number };
};

// Define the navigation prop type for the Login screen
export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

// If you have route props for the Login screen, you can define them as well
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export interface LoginResponse {
  success: boolean;
  token: string;
}

// Optionally, you can define other screen navigation prop types here

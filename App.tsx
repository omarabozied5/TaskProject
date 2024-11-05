/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProfileScreen from './screens/ProfileScreen';
import FlatListScreen from './screens/FlatListScreen';
import LoginScreen from './screens/LoginScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type TabBarIconProps = {
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require('./assets/profile.png') as ImageSourcePropType}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Items"
        component={FlatListScreen}
        options={{
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require('./assets/usercard.png') as ImageSourcePropType}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
// const App: React.FC = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <NavigationContainer>
//           <Tab.Navigator initialRouteName="Profile">
//             <Tab.Screen
//               name="Profile"
//               component={ProfileScreen}
//               options={{
//                 tabBarIcon: ({ color, size }: TabBarIconProps) => (
//                   <Image
//                     style={{ width: 30, height: 30 }}
//                     source={
//                       require('./assets/profile.png') as ImageSourcePropType
//                     }
//                   />
//                 ),
//                 headerShown: false,
//               }}
//             />
//             <Tab.Screen
//               name="Community"
//               component={FlatListScreen}
//               options={{
//                 tabBarIcon: ({ color, size }: TabBarIconProps) => (
//                   <Image
//                     // eslint-disable-next-line react-native/no-inline-styles
//                     style={{ width: 30, height: 30 }}
//                     source={require('./assets/comm.png') as ImageSourcePropType}
//                   />
//                 ),
//                 headerShown: false,
//               }}
//             />
//           </Tab.Navigator>
//         </NavigationContainer>
//       </GestureHandlerRootView>
//     </QueryClientProvider>
//   );
// };

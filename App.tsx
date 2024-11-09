import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Image, ImageSourcePropType } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/ProfileScreen';
import FlatListScreen from './screens/FlatListScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import LoginScreen from './screens/LoginScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LanguageSelector from './localization/LanguageSelector';
import i18n from './localization/i18n';
import i18next from 'i18next';
import { useEffect } from 'react';

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
  const { t } = useTranslation();

  // Function to load language preference from AsyncStorage
  const loadLanguagePreference = async () => {
    const lng = await AsyncStorage.getItem('appLanguage');
    if (lng) {
      i18next.changeLanguage(lng); // Change the language in i18next
    }
  };
  useEffect(() => {
    loadLanguagePreference();
  }, []);
  return (
    <GestureHandlerRootView>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Main" component={TabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}

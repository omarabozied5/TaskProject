/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProfileScreen from './screens/ProfileScreen';
import FlatListScreen from './screens/FlatListScreen';

type TabBarIconProps = {
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Profile">
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }: TabBarIconProps) => (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={
                    require('./assets/profile.png') as ImageSourcePropType
                  }
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Community"
            component={FlatListScreen}
            options={{
              tabBarIcon: ({ color, size }: TabBarIconProps) => (
                <Image
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ width: 30, height: 30 }}
                  source={require('./assets/comm.png') as ImageSourcePropType}
                />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

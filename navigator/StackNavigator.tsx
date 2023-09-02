import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from '../types/navigation/type';
import RestaurantScreen from '../screens/RestaurantScreen';
import BasketScreen from '../screens/BasketScreen';
import PerpareOrderScreen from '../screens/PerpareOrderScreen';
import DeliverScreen from '../screens/DeliverScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Restaurant"
        component={RestaurantScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="PerpareOrder"
        component={PerpareOrderScreen}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="Deliver"
        component={DeliverScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

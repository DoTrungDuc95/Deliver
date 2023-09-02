import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../types/navigation/type';
import { useAppSelector } from '../store/hook';
import {
  ItemType,
  basketItemsTotal,
  basketPriceTotal,
  groupByRestaurant,
  selectBasketItems,
} from '../features/basketSlice';
import { StatusBar } from 'expo-status-bar';
import { XCircleIcon } from 'react-native-heroicons/solid';
import BasketGroup from '../components/group/BasketGroup';
import SafeScrollView from '../components/SafeScrollView';

type BasketScreenProps = {
  navigation: RootStackScreenProps<'Basket'>['navigation'];
};

const BasketScreen = ({ navigation }: BasketScreenProps) => {
  const price = useAppSelector(basketPriceTotal);
  const group = useAppSelector(groupByRestaurant);

  return (
    <View className="flex-1">
      <SafeScrollView top contentStyle={{ paddingBottom: 200 }}>
        <StatusBar hidden />

        <View className="bg-white flex-row items-center justify-center py-4">
          <Text className="text-2xl font-bold">Basket</Text>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute right-2"
          >
            <XCircleIcon color={'#00bbcc'} size={45} />
          </TouchableOpacity>
        </View>

        {Object.entries(group).map(([key, val]) => {
          return <BasketGroup key={key} items={val as ItemType[]} />;
        })}
      </SafeScrollView>

      <View className="p-4 bg-slate-50 absolute w-full bottom-0">
        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-base text-[#0007]">Sub total</Text>

          <Text className="font-bold text-base text-[#0007]">
            ${price.toFixed(1)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-base text-[#0007]">Transfer fee</Text>

          <Text className="font-bold text-base text-[#0007]">$5.0</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-lg">Total</Text>

          <Text className="font-bold text-lg">${(price + 5).toFixed(1)}</Text>
        </View>

        <TouchableOpacity
          className="p-4 bg-[#00bbcc] mt-4"
          onPress={() => navigation.navigate('PerpareOrder')}
        >
          <Text className="text-lg text-white font-bold text-center">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BasketScreen;

import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAppSelector } from '../store/hook';
import { basketItemsTotal, basketPriceTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';

const BasketButton = () => {
  const total = useAppSelector(basketItemsTotal);
  const price = useAppSelector(basketPriceTotal);

  const navigation = useNavigation();

  return (
    <View className="absolute bottom-5 w-full z-10">
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className="flex-row items-center bg-[#00bbcc] p-4 mx-5"
      >
        <Text className="absolute left-4 text-white text-lg font-extrabold bg-[#078078] px-2 py-1">
          {total}
        </Text>

        <Text className="flex-1 text-center text-lg text-white font-extrabold">
          View basket
        </Text>

        <Text className="absolute right-4 text-white font-extrabold text-lg">
          ${price.toFixed(1)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketButton;

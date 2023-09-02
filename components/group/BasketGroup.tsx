import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ItemType } from '../../features/basketSlice';
import { useNavigation } from '@react-navigation/native';

type BasketGroupProps = {
  items: ItemType[];
};

const BasketGroup = ({ items }: BasketGroupProps) => {
  const navigation = useNavigation();

  return (
    <View className="mt-3 bg-white">
      <View className="flex-row items-center gap-2 p-2">
        <Image
          source={{ uri: items[0].restaurantImg }}
          className="w-10 aspect-square"
        />

        <Text className="text-lg flex-1 font-bold">
          {items[0].restaurantName}
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Restaurant', { id: items[0].restaurantId })
          }
        >
          <Text className="text-[#00bbcc] font-semibold">Change</Text>
        </TouchableOpacity>
      </View>

      <View className="">
        {items.map((data) => (
          <View
            key={data.id}
            className="flex-row items-center p-4 space-x-2 border-t-gray-200 border-t"
          >
            <Text className='font-bold text-[#00bbcc]'>{data.qty} × </Text>

            <Image
              source={{ uri: data.imgUrl }}
              className="w-10 aspect-square"
            />

            <Text className="flex-1 font-bold">{data.name}</Text>

            <Text className='font-bold'>${(data.price * data.qty).toFixed(1)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BasketGroup;

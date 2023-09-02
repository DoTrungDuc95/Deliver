import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { StarIcon } from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

type RestaurantCardProps = {
  id: string;
  imgUrl: string;
  title: string;
  rating: number;
  genre: string;
  address: string;
};

const RestaurantCard = ({
  address,
  genre,
  id,
  imgUrl,
  rating,
  title,
}: RestaurantCardProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Restaurant', { id })}
      className="bg-white shadow-lg max-w-[256px]"
    >
      <Image source={{ uri: imgUrl }} className="w-64 h-36 rounded-sm" />

      <View className="px-3 pb-4">
        <Text className="text-lg font-bold pt-2">{title}</Text>

        <View className="flex-row items-center gap-1">
          <StarIcon color={'#00bbcc'} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-[#00bbcc]">{rating}/5</Text> - {genre}
          </Text>
        </View>

        <View className="flex-row items-center gap-1 mt-0">
          <MapPinIcon color={'gray'} size={22} />
          <Text numberOfLines={1} className="text-xs text-gray-500">
            Nearby - <Text className="font-bold text-black">{address}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

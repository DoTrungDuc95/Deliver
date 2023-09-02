import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { RootStackScreenProps } from '../types/navigation/type';
import { StatusBar } from 'expo-status-bar';

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from 'react-native-heroicons/solid';
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline';

import DishRow from '../components/dish/DishRow';
import BasketButton from '../components/BasketButton';

import { useAppSelector } from '../store/hook';
import { selectBasketItems } from '../features/basketSlice';

import { urlFor } from '../sanity';
import sanityClient from '../sanity';
import { RestaurantType } from '../types';

type RestaurantScreenProps = {
  route: RootStackScreenProps<'Restaurant'>['route'];
  navigation: RootStackScreenProps<'Restaurant'>['navigation'];
};

const RestaurantScreen = ({ route, navigation }: RestaurantScreenProps) => {
  const { id } = route.params;

  const [restaurant, setRestaurant] = useState<RestaurantType>();
  const [isLoading, setIsLoading] = useState(true);

  const items = useAppSelector(selectBasketItems);

  useEffect(() => {
    setIsLoading(true);
    sanityClient
      .fetch(
        `
      *[_type=='restaurant' && _id==$id]{
        _id,
        name,
        genre -> {
          name
        },
        dishes[] -> {
          _id,
          price,
          image,
          description,
          name
        },
        description,
        rating,
        image,
        address,
        long,
        lat
      }[0]
    `,
        { id }
      )
      .then((data) => {
        setRestaurant(data);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading || !restaurant)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator color={'#00bbcc'} size={'large'} />
      </View>
    );

  return (
    <View>
      {items.length > 0 && <BasketButton />}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          backgroundColor: '#fff',
        }}
      >
        <StatusBar hidden />
        <View className="relative">
          <Image
            source={{ uri: urlFor(restaurant.image).url() }}
            className="w-full h-56 bg-gray-300 p4"
          />

          <TouchableOpacity
            className="absolute top-4 left-4 p-2 bg-white rounded-full"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size={20} color={'#00bbcc'} />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="pt-4 px-4">
            <Text className="text-3xl font-bold">{restaurant.name}</Text>

            <View className="my-1">
              <View className="flex-row items-center gap-1 mb-1">
                <StarIcon color={'#00bbcc'} size={22} />

                <Text className="text-sx text-gray-500">
                  {restaurant.rating}/5 · <Text>{restaurant.genre.name}</Text>
                </Text>
              </View>

              <View className="flex-row items-center gap-1">
                <MapPinIcon color={'#ff0000'} size={22} />

                <Text className="text-sx text-gray-500">
                  {restaurant.address}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2 pb-4">
              {restaurant.description}
            </Text>
          </View>

          <TouchableOpacity className="flex-row items-center gap-2 p-4 border-y border-gray-400">
            <QuestionMarkCircleIcon color={'#ccc'} size={20} />

            <Text className="flex-1 font-bold text-base">
              Have a food allegry?
            </Text>

            <ChevronRightIcon color={'#00bbcc'} size={20} />
          </TouchableOpacity>
        </View>

        <View className="bg-gray-200">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

          {restaurant.dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              description={dish.description}
              imgUrl={urlFor(dish.image).url()}
              name={dish.name}
              price={dish.price}
              long={restaurant.long}
              lat={restaurant.lat}
              restaurantId={id}
              restaurantName={restaurant.name}
              restaurantImg={urlFor(restaurant.image).url()}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantScreen;

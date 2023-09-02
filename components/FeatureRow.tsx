import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import { RestaurantCardType } from '../types';
import sanityClient, { urlFor } from '../sanity';

type FeatureRowProps = {
  id: string;
  title: string;
  description: string;
};

const FeatureRow = ({ id, title, description }: FeatureRowProps) => {
  const [restaurants, setRestaurants] = useState<RestaurantCardType[]>([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type=='feature' && _id==$id]{
      restaurants[] -> {
        _id,
        name,
        image,
        rating,
        address,
        genre -> {
          name
        }
      }
   }
    `,
        { id }
      )
      .then((data) => setRestaurants(data[0].restaurants));
  }, [id]);

  return (
    <View>
      <View className="flex-row items-center justify-between mt-4 px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={20} color={'#00ccbb'} />
      </View>

      <Text className="text-xs text-gray-400 px-4">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
        className="mt-4"
      >
        {restaurants.length > 0 &&
          restaurants.map((data) => (
            <RestaurantCard
              key={data._id}
              id={data._id}
              address={data.address}
              genre={data.genre.name}
              imgUrl={urlFor(data.image).url()}
              rating={data.rating}
              title={data.name}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default React.memo(FeatureRow);

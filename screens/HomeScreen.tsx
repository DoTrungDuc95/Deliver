import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeView from '../components/SafeView';
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/category/Categories';
import FeatureRow from '../components/FeatureRow';
import sanityClient from '../sanity';
import { FeatureType } from '../types';

const HomeScreen = () => {
  const [featured, setFeatured] = useState<FeatureType[]>([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type=='feature']{
        _id,
        name,
        description, 
       }
    `
      )
      .then((data) => setFeatured(data));
  }, []);

  return (
    <SafeView top safeClassName="bg-white">
      <View className="flex-row items-center gap-2 py-3 px-4">
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className="w-7 aspect-square bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="text-xs font-bold text-gray-400">Deliver Now</Text>
          <View className="flex-row items-end">
            <Text className="font-bold text-xl">Current Location</Text>
            <ChevronDownIcon size={20} color={'#00ccbb'} />
          </View>
        </View>

        <UserIcon size={35} color={'#00ccbb'} />
      </View>

      <View className="flex-row items-center gap-2 px-4">
        <View className="flex-row flex-1 items-center space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon color={'gray'} size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            placeholderTextColor={'#0005'}
          />
        </View>

        <AdjustmentsVerticalIcon color={'#00ccbb'} />
      </View>

      <ScrollView
        className="bg-gray-100 flex-1 mt-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <Categories />

        {featured.length > 0 &&
          featured.map((data) => (
            <FeatureRow
              key={data._id}
              id={data._id}
              title={data.name}
              description={data.description}
            />
          ))}
      </ScrollView>
    </SafeView>
  );
};

export default HomeScreen;

import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../types/navigation/type';
import SafeView from '../components/SafeView';
import { XCircleIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

type DeliverScreenProps = {
  navigation: RootStackScreenProps<'Deliver'>['navigation'];
};

const DeliverScreen = ({ navigation }: DeliverScreenProps) => {
  return (
    <View className="bg-[#00bbcc] flex-1">
      <SafeView top flex={0}>
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <XCircleIcon color={'#fff'} size={30} />
          </TouchableOpacity>

          <Text className="text-white text-lg">Order help</Text>
        </View>

        <View className="mx-4 bg-white my-2 p-6 rounded-md shadow-lg">
          <View className="flex-row justify-between mb-4">
            <View>
              <Text className="text-lg text-gray-400">EStimated arrival</Text>
              <Text className="text-4xl font-bold">10-15 minutes</Text>
            </View>

            <Image
              source={{ uri: 'https://links.papareact.com/fls' }}
              className="h-20 w-20"
            />
          </View>

          <Progress.Bar color="#00bbcc" indeterminate width={null} />

          <Text className="mt-3">Your order is being perpared</Text>
        </View>
      </SafeView>

      <MapView
        initialRegion={{
          latitude: 20.997576,
          longitude: 105.845374,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -z-10 -mt-20"
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: 20.997576,
            longitude: 105.845374,
          }}
          identifier="origin"
          pinColor="#ff0000"
          title='Deliveroo'
        />
      </MapView>

      <SafeView bottom safeClassName="bg-white" flex={0}>
        <View className="p-4 flex-row items-center space-x-4">
          <Image
            source={{ uri: 'https://links.papareact.com/wru' }}
            className="h-12 w-12 rounded-full"
          />

          <View className="flex-1">
            <Text className="text-lg">Do Trung Duc</Text>

            <Text className="text-gray-400">Your Rider</Text>
          </View>

          <Text className="text-[#00bbcc] text-lg font-bold">Call</Text>
        </View>
      </SafeView>
    </View>
  );
};

export default DeliverScreen;

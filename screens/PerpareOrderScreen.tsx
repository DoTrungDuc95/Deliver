import React, { useEffect } from 'react';
import SafeView from '../components/SafeView';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { RootStackScreenProps } from '../types/navigation/type';

type PerpareOrderScreenProps = {
  navigation: RootStackScreenProps<'PerpareOrder'>['navigation'];
};

const PerpareOrderScreen = ({ navigation }: PerpareOrderScreenProps) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigation.navigate('Deliver');
    }, 4000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <SafeView safeClassName="flex-1 items-center justify-center bg-[#01CCBD]">
      <Animatable.Image
        source={require('../assets/deliveroodribbbble.gif')}
        className="w-96 h-96"
        animation="slideInUp"
        iterationCount={1}
      />

      <Animatable.Text
        className="text-lg my-10 text-white text-center font-bold"
        animation="slideInUp"
        iterationCount={1}
      >
        Waiting for restaurant accept your order
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="#fff" />
    </SafeView>
  );
};

export default PerpareOrderScreen;

import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

type CategotyCardProps = {
  imgUrl: string;
  title: string;
};

const CategotyCard = ({ imgUrl, title }: CategotyCardProps) => {
  return (
    <TouchableOpacity className="relative">
      <Image source={{ uri: imgUrl }} className="w-20 aspect-square rounded" />
      <Text className="absolute bg-[#0007] p-1 bottom-1 left-1 text-white font-bold capitalize">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategotyCard;

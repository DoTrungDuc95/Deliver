import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useMemo, useState } from 'react';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  addQty,
  addToBasket,
  removeFromBasket,
  removeQty,
  selectBasketItems,
} from '../../features/basketSlice';

type DishRowProps = {
  id: string;
  imgUrl: string;
  price: number;
  description: string;
  name: string;
  long: number;
  lat: number;
  restaurantId: string;
  restaurantName: string;
  restaurantImg: string;
};

const DishRow = ({
  id,
  description,
  imgUrl,
  name,
  price,
  lat,
  long,
  restaurantId,
  restaurantName,
  restaurantImg,
}: DishRowProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectBasketItems);

  const itemCounts = useMemo(
    () => items.find((item) => item.id === id)?.qty,
    [items]
  );

  const [isPress, setIsPress] = useState(!!itemCounts);

  const addItemHandler = () => {
    if (!itemCounts) {
      dispatch(
        addToBasket({
          id,
          imgUrl,
          name,
          price,
          qty: 1,
          lat,
          long,
          restaurantId,
          restaurantName,
          restaurantImg,
        })
      );
    } else {
      dispatch(addQty(id));
    }
  };

  const removeItemHandler = () => {
    if (itemCounts === 1) {
      dispatch(removeFromBasket(id));
    } else {
      dispatch(removeQty(id));
    }
  };

  return (
    <View className="bg-white">
      <TouchableOpacity
        onPress={() => {
          if (itemCounts) return;
          setIsPress((p) => !p);
        }}
        className="p-4 border-t border-gray-200 border-collapse"
      >
        <View className="flex-row gap-4">
          <View className="flex-1 ">
            <Text className="text-lg mb-1 font-semibold">{name}</Text>

            <Text className="text-gray-500" numberOfLines={3}>
              {description}
            </Text>

            <Text className="font-semibold text-base mt-2">
              ${price.toFixed(1)}
            </Text>
          </View>

          <View>
            <Image
              style={{ borderWidth: 1, borderColor: '#000' }}
              source={{ uri: imgUrl }}
              className="w-20 aspect-square"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPress && (
        <View className="p-4 flex-row items-center gap-2">
          <TouchableOpacity
            disabled={!itemCounts}
            onPress={() => removeItemHandler()}
          >
            <MinusCircleIcon
              size={40}
              color={itemCounts ? '#00bbcc' : '#ccc'}
            />
          </TouchableOpacity>

          <Text className="font-semibold text-base">{itemCounts || 0}</Text>

          <TouchableOpacity onPress={() => addItemHandler()}>
            <PlusCircleIcon size={40} color={'#00bbcc'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default React.memo(DishRow);

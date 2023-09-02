import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type ItemType = {
  id: string;
  imgUrl: string;
  name: string;
  price: number;
  qty: number;
  lat: number;
  long: number;
  restaurantId: string;
  restaurantName: string;
  restaurantImg: string;
};

type BasketState = {
  items: ItemType[];
};

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<ItemType>) => {
      state.items.push(action.payload);
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        ++item.qty;
      }
    },
    removeQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        --item.qty;
      }
    },
  },
});

export const { addToBasket, removeFromBasket, addQty, removeQty } =
  basketSlice.actions;

export const selectBasketItems = (state: RootState) => state.basket.items;

export const basketItemsTotal = (state: RootState) =>
  state.basket.items.reduce((acc, val) => acc + val.qty, 0);

export const basketPriceTotal = (state: RootState) =>
  state.basket.items.reduce((acc, val) => acc + val.qty * val.price, 0);

const items = (state: RootState) => state.basket.items;

export const groupByRestaurant = createSelector([items], (items) => {
  const obj: any = {};
  items.forEach((item) => {
    const resId = item.restaurantId;
    if (resId in obj) obj[resId].push(item);
    else obj[resId] = [item];
  });

  return obj;
});

export default basketSlice.reducer;

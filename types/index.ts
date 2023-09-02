export type CategoryType = {
  name: string;
  image: any;
  _id: string;
};

export type DishType = {
  name: string;
  description: string;
  price: number;
  image: any;
  _id: string;
};

export type RestaurantCardType = {
  name: string;
  image: any;
  address: string;
  rating: number;
  genre: {
    name: string;
  };
  _id: string;
}

export type RestaurantType = {
  name: string;
  description: string;
  image: any;
  lat: number;
  long: number;
  address: string;
  rating: number;
  genre: {
    name: string;
  };
  dishes: DishType[];
  _id: string;
};

export type FeatureType = {
  name: string;
  description: string;
  _id: string;
};

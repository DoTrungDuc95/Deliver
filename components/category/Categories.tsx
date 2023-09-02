import { ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CategotyCard from './CategotyCard';
import sanityClient, { urlFor } from '../../sanity';
import { CategoryType } from '../../types';

const Categories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type=='category']{
        _id,
        image,
        name
      }
    `
      )
      .then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, gap: 8 }}
    >
      {categories.length > 0 &&
        categories.map((data) => (
          <CategotyCard
            key={data._id}
            imgUrl={urlFor(data.image).url()}
            title={data.name}
          />
        ))}
    </ScrollView>
  );
};

export default Categories;

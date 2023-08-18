import { useEffect, useState } from 'react';
import MainTemplate from '../templates/MainTemplate';
import HomeSection from '../organisms/home/HomeSection';
import data from '../../data/data.json';
import type { ListOfCategories } from '../../types';

const { videos: videosData, categories: categoriesData } = data;

const Home = (): JSX.Element => {
  const [videos, setVideos] = useState(videosData);
  const [categories, setCategories] = useState(categoriesData);

  const orderCategories = (categories: ListOfCategories): ListOfCategories => {
    // First category that prop isFeatured is true
    const firstFeaturedCategory = categories.find((category) => category.isFeatured);
    if (firstFeaturedCategory !== undefined) {
      const filteredCategories = [...categories].filter(
        (category) => category.id !== firstFeaturedCategory.id
      );
      const orderedCategories = [firstFeaturedCategory, ...filteredCategories];
      return orderedCategories;
    }
    return categories;
  };

  useEffect(() => {
    setCategories(orderCategories(categories));
  }, []);

  return (
    <MainTemplate>
      {categories.map((category) => (
        <HomeSection
          key={category.id}
          category={category}
          videos={videos.filter((video) => video.category === category.code)}
        />
      ))}
    </MainTemplate>
  );
};

export default Home;

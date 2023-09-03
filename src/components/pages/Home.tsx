import { useData } from '../../context/dataContext';
import type { ListOfCategories } from '../../types';
import MainTemplate from '../templates/MainTemplate';
import HomeSection from '../organisms/home/HomeSection';
import HomeNoData from '../molecules/HomeNoData';

const Home = (): JSX.Element => {
  const {
    vids: { videos },
    catgs: { categories }
  } = useData();

  const orderCategories = (categories: ListOfCategories): ListOfCategories => {
    // First category that prop isFeatured is true
    const firstFeaturedCategory = categories.find(
      (category) => category.isFeatured
    );
    if (firstFeaturedCategory !== undefined) {
      const filteredCategories = [...categories].filter(
        (category) => category.id !== firstFeaturedCategory.id
      );
      const orderedCategories = [firstFeaturedCategory, ...filteredCategories];
      return orderedCategories;
    }
    return categories;
  };

  return (
    <MainTemplate>
      {categories.length > 0
        ? (
            orderCategories(categories).map((category) => (
          <HomeSection
            key={category.id}
            category={category}
            videos={videos.filter((video) => video.category === category.code)}
          />
            ))
          )
        : (
        <HomeNoData type="category" />
          )}
      {videos.length === 0 && <HomeNoData type="video" />}
    </MainTemplate>
  );
};

export default Home;

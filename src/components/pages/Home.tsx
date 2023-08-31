import MainTemplate from '../templates/MainTemplate';
import HomeSection from '../organisms/home/HomeSection';
import type { ListOfCategories } from '../../types';
import { useData } from '../../context/DataContext';

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
      {orderCategories(categories).map((category) => (
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

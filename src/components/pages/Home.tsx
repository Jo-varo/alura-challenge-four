import { useData } from '../../context/dataContext';
import { RiLoader4Fill } from 'react-icons/ri';
import type { ListOfCategories, ListOfVideos } from '../../types';
import MainTemplate from '../templates/MainTemplate';
import HomeSection from '../organisms/home/HomeSection';
import HomeNoData from '../molecules/HomeNoData';

const Home = (): JSX.Element => {
  const {
    vids: { videos, isVideosLoading },
    catgs: { categories, isCategoriesLoading }
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

  const renderMessageStatusData = (
    categories: ListOfCategories,
    isCategoriesLoading: boolean,
    videos: ListOfVideos,
    isVideosLoading: boolean
  ): JSX.Element => {
    if (isCategoriesLoading || isVideosLoading) {
      return (
        <div className='my-10'>
          <RiLoader4Fill className="mx-auto text-6xl mb-4 animate-spin"/>
          <h3 className="text-center text-3xl">Cargando</h3>
        </div>
      );
    }

    if (categories.length === 0 && videos.length === 0) {
      return <HomeNoData type="data" />;
    }

    if (categories.length === 0) {
      return <HomeNoData type="category" />;
    }

    if (videos.length === 0) return <HomeNoData type="video" />;

    return (
      <>
        {orderCategories(categories).map((category) => (
          <HomeSection
            key={category.id}
            category={category}
            videos={videos.filter((video) => video.category === category.code)}
          />
        ))}
      </>
    );
  };

  return (
    <MainTemplate>
      {renderMessageStatusData(
        categories,
        isCategoriesLoading,
        videos,
        isVideosLoading
      )}
    </MainTemplate>
  );
};

export default Home;

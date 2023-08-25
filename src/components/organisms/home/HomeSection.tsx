/* eslint-disable multiline-ternary */
import type { Category, ListOfVideos } from '../../../types';
import HomeBanner from './HomeBanner';
import SectionTitle from '../../atoms/SectionTitle';
import Carousel from '../carousel/Carousel';

interface HomeSectionProps {
  category: Category
  videos: ListOfVideos
}

const HomeSection = ({ category, videos }: HomeSectionProps): JSX.Element => {
  const { name, longDescription, shortDescription, color, isFeatured } =
    category;

  const sortVideos = (
    videos: ListOfVideos,
    isFeatured: boolean
  ): ListOfVideos => {
    return isFeatured ? [...videos].toSpliced(0, 1) : videos;
  };

  return videos.length > 0 ? (
    <section className={`mb-14 px-8${isFeatured ? ' bg-banner' : ''}`}>
      {isFeatured ? (
        <HomeBanner
          title={name}
          shortDescription={shortDescription}
          longDescription={longDescription}
          color={color}
          video={videos[0]}
        />
      ) : (
        <div className="flex gap-5 h-10 items-baseline mb-8">
          <SectionTitle text={name} color={color} />
          <p>{shortDescription}</p>
        </div>
      )}
      <Carousel color={color} videos={sortVideos(videos, isFeatured)} />
    </section>
  ) : (
    <></>
  );
};

export default HomeSection;

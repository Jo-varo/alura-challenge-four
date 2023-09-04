import type { Video } from '../../../types';
import SectionTitle from '../../atoms/SectionTitle';
import VideoCard from '../carousel/VideoCard';

interface HomeBannerProps {
  title: string
  shortDescription: string
  longDescription: string
  color: string
  video: Video
}

const HomeBanner = ({
  title,
  shortDescription,
  longDescription,
  color,
  video
}: HomeBannerProps): JSX.Element => {
  const { poster, url, description } = video;

  return (
    <div className="pt-24 md:pt-60 pb-8 md:pb-14 flex flex-col-reverse md:flex-row gap-4 md:gap-10">
      <div className="flex-1 text-white">
        <SectionTitle banner text={title} color={color} />
        <h3 className="text-xl md:text-4xl mt-1 md:mt-4 font-semibold">{shortDescription}</h3>
        <p className="mt-2 text">{longDescription}</p>
      </div>
      <div className="flex-1">
        <VideoCard
          url={url}
          poster={poster}
          description={description}
          color={color}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default HomeBanner;

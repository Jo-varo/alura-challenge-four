import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import type { ListOfVideos } from '../../../types';
import VideoCard from './VideoCard';

interface CarouselProps {
  color: string
  videos: ListOfVideos
}

const Carousel = ({ color, videos }: CarouselProps): JSX.Element => {
  return (
    <Swiper
      style={{
        '--swiper-navigation-color': 'white'
      }}
      slidesPerView={3}
      spaceBetween={15}
      rewind
      navigation
      modules={[Navigation]}
    >
      {videos?.map(({ id, description, poster, url }) => (
        <SwiperSlide key={id}>
          <VideoCard
            poster={poster}
            url={url}
            description={description}
            color={color}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

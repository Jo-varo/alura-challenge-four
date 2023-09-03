import { createContext, useContext, useEffect, useState } from 'react';

import data from '../data/data.json';
import type {
  CategoryData,
  ListOfCategories,
  ListOfVideos,
  VideoData,
  idVidCat
} from '../types';

interface contextResult {
  vids: {
    videos: ListOfVideos
    getVideos: () => ListOfVideos
    createVideo: (video: VideoData) => void
    updateVideo: (id: idVidCat, video: VideoData) => void
    deleteVideo: (id: idVidCat) => void
  }
  catgs: {
    categories: ListOfCategories
    getCategories: () => ListOfCategories
    createCategory: (category: CategoryData) => void
    updateCategory: (id: idVidCat, category: CategoryData) => void
    deleteCategory: (id: idVidCat) => void
  }
}

export const dataContext = createContext<contextResult | null>(null);

export const useData = (): contextResult => {
  const context = useContext(dataContext);
  if (context == null) {
    throw new Error('context is null');
  }
  return context;
};

export const DataProvider = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [videos, setVideos] = useState<ListOfVideos>([]);
  const [categories, setCategories] = useState<ListOfCategories>([]);

  const getVideos = (): ListOfVideos => {
    setVideos(data.videos);
    return videos;
  };

  const getCategories = (): ListOfCategories => {
    setCategories(data.categories);
    return data.categories;
  };

  const createVideo = (video: VideoData): void => {
    const id = crypto.randomUUID();
    const newVideos = [...videos, { id, ...video }];
    setVideos(newVideos);
  };

  const deleteVideo = (id: idVidCat): void => {
    const newVideos = videos.filter((video) => video.id !== id);
    setVideos(newVideos);
  };

  const updateVideo = (id: idVidCat, updatedVideo: VideoData): void => {
    const newVideos = videos.map((video) =>
      video.id === id ? { id, ...updatedVideo } : video
    );
    setVideos(newVideos);
  };

  const createCategory = (category: CategoryData): void => {
    const id = crypto.randomUUID();
    const newCategories = [...categories, { id, ...category }];
    setCategories(newCategories);
  };

  const updateCategory = (
    id: idVidCat,
    updatedCategory: CategoryData
  ): void => {
    const newCategories = categories.map((category) =>
      category.id === id ? { id, ...updatedCategory } : category
    );
    setCategories(newCategories);
  };

  const deleteCategory = (id: idVidCat): void => {
    const newCategories = categories.filter((category) => category.id !== id);
    setCategories(newCategories);
  };

  useEffect(() => {
    getVideos();
    getCategories();
  }, []);

  return (
    <dataContext.Provider
      value={{
        vids: {
          videos,
          getVideos,
          createVideo,
          deleteVideo,
          updateVideo
        },
        catgs: {
          categories,
          getCategories,
          createCategory,
          updateCategory,
          deleteCategory
        }
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

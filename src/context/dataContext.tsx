import { createContext, useContext, useEffect, useState } from 'react';

import type {
  CategoryData,
  ListOfCategories,
  ListOfVideos,
  VideoData,
  idVidCat
} from '../types';
import {
  createVideoRequest,
  deleteVideoRequest,
  getVideosRequest,
  updateVideoRequest
} from '../api/videos';
import {
  createCategoryRequest,
  deleteCategoryRequest,
  getCategoriesRequest,
  updateCategoryRequest
} from '../api/categories';

interface contextResult {
  vids: {
    videos: ListOfVideos
    getVideos: () => Promise<void>
    createVideo: (video: VideoData) => Promise<void>
    updateVideo: (id: idVidCat, video: VideoData) => Promise<void>
    deleteVideo: (id: idVidCat) => Promise<void>
  }
  catgs: {
    categories: ListOfCategories
    getCategories: () => Promise<void>
    createCategory: (category: CategoryData) => Promise<void>
    updateCategory: (id: idVidCat, category: CategoryData) => Promise<void>
    deleteCategory: (id: idVidCat) => Promise<void>
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

  const getVideos = async (): Promise<void> => {
    const dataRes = await getVideosRequest();
    if (dataRes !== undefined) {
      setVideos(dataRes);
    }
  };

  const getCategories = async (): Promise<void> => {
    const dataRes = await getCategoriesRequest();
    if (dataRes !== undefined) {
      setCategories(dataRes);
    }
  };

  const createVideo = async (video: VideoData): Promise<void> => {
    try {
      const res = await createVideoRequest(video);
      const newVideos = res !== undefined ? [...videos, res] : videos;
      setVideos(newVideos);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteVideo = async (id: idVidCat): Promise<void> => {
    const dataRes = await deleteVideoRequest(id);
    if (dataRes) {
      setVideos(videos.filter((video) => video.id !== id));
    }
  };

  const updateVideo = async (
    id: idVidCat,
    updatedVideo: VideoData
  ): Promise<void> => {
    const dataRes = await updateVideoRequest(id, updatedVideo);
    if (dataRes !== undefined) {
      setVideos(videos.map((video) => (video.id === id ? dataRes : video)));
    }
  };

  const createCategory = async (category: CategoryData): Promise<void> => {
    const dataRes = await createCategoryRequest(category);
    if (dataRes !== undefined) {
      setCategories([...categories, dataRes]);
    }
  };

  const updateCategory = async (
    id: idVidCat,
    updatedCategory: CategoryData
  ): Promise<void> => {
    const dataRes = await updateCategoryRequest(id, updatedCategory);
    if (dataRes !== undefined) {
      setCategories(
        categories.map((category) => (category.id === id ? dataRes : category))
      );
    }
  };

  const deleteCategory = async (id: idVidCat): Promise<void> => {
    const dataRes = await deleteCategoryRequest(id);
    if (dataRes) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  useEffect(() => {
    void getVideos();
    void getCategories();
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

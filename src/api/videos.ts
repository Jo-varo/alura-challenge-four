import { apiUrl } from '../constants/variables';
import type { ListOfVideos, Video, VideoData, idVidCat } from '../types';

const url = `${apiUrl as string}/videos`;

export const getVideosRequest = async (): Promise<ListOfVideos | undefined> => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('error in api');
    return await res.json();
  } catch (error) {
    console.error(error)
  }
};

export const createVideoRequest = async (
  video: VideoData
): Promise<Video | undefined> => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(video)
    });
    if (!res.ok) throw new Error('error in api');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateVideoRequest = async (
  id: idVidCat,
  video: VideoData
): Promise<Video | undefined> => {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(video)
    });
    if (!res.ok) throw new Error('error in api');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteVideoRequest = async (id: idVidCat): Promise<boolean> => {
  try {
    const res = await fetch(`${url}/1${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('error in api');
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

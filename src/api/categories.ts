import { apiUrl } from '../constants/variables';
import type {
  Category,
  CategoryData,
  ListOfCategories,
  idVidCat
} from '../types';

const url = `${apiUrl as string}/categories`;

export const getCategoriesRequest = async (): Promise<
ListOfCategories | undefined
> => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('error in api');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCategoryRequest = async (
  category: CategoryData
): Promise<Category | undefined> => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(category)
    });
    if (!res.ok) throw new Error('error in api');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCategoryRequest = async (
  id: idVidCat,
  category: CategoryData
): Promise<Category | undefined> => {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(category)
    });
    if (!res.ok) throw new Error('error in api');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCategoryRequest = async (id: idVidCat): Promise<boolean> => {
  try {
    const res = await fetch(`${url}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('error in api');
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

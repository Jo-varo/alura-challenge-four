export interface Video {
  id: idVidCat
  title: string
  url: string
  poster: string
  category: string // here should be the category code
  description: string
}

export type ListOfVideos = Video[];

export interface Category {
  id: idVidCat
  name: string
  shortDescription: string
  longDescription: string
  code: string
  color: string
  isFeatured: boolean
}

export type ListOfCategories = Category[];

export type idVidCat = string | number;

export interface VideoData {
  title: string
  url: string
  poster: string
  category: string
  description: string
}

export interface CategoryData {
  name: string
  shortDescription: string
  longDescription: string
  code: string
  color: string
  isFeatured: boolean
}

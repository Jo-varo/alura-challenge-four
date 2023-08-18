export interface Video {
  id: number
  title: string
  url: string
  poster: string
  category: string // here should be the category code
  description: string
}

export type ListOfVideos = Video[];

export interface Category {
  id: number
  name: string
  shortDescription: string
  longDescription: string
  code: string
  color: string
  isFeatured: boolean
}

export type ListOfCategories = Category[]

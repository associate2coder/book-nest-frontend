import { Category, CategoryResponse } from "../shared/types/Category";
import { apiClient } from "./apiClient";

const GENRE_PATH = '/genres';

export const getGenres = async () => {
  return apiClient.get<CategoryResponse>(GENRE_PATH);
}

export const getGenre = async (id: number) => {
  return apiClient.get<Category>(`${GENRE_PATH}/${id}`);
}

export const categoryService = {
  getGenres: getGenres,
  getGenre: getGenre,
}



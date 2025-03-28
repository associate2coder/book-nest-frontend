import { Book, BookData, BookResponse } from "../shared/types/Book";
import { apiClient } from "./apiClient";

const BOOKS_PATH = '/books';

export const getAllBooks = async () => {
  return apiClient.get<BookResponse>(`${BOOKS_PATH}`);
}

export const getBooks = async (search: string = '') => {
  return apiClient.get<BookResponse>(`${BOOKS_PATH}${search}`);
}

export const getBook = async (id: number) => {
  return apiClient.get<Book>(`${BOOKS_PATH}/${id}`);
}

export const postBook = async (data: BookData) => {
  console.log(JSON.stringify(data));
  
  return apiClient.post<BookData>(`${BOOKS_PATH}`, data);
}

export const bookService = {
  getBooks,
  getBook,
  postBook,
}

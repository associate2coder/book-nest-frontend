// import { API_BASE_URL } from "../config/constants";
import { Book, BookResponse } from "../shared/types/Book";
import { apiClient } from "./apiClient";
// import { apiClient } from "./apiClient";

const BOOKS_PATH = '/books';


export const getBooks = async (search: string = '') => {
  const path = BOOKS_PATH + search;

  return apiClient.get<BookResponse>(path);
}

export const getBook = async (id: number) => {
  const path = BOOKS_PATH + `/${id}`;

  return apiClient.get<Book>(path);
}

export const bookService = {
  getBooks,
  getBook,
}

import { Book, BookData, BookResponse } from "../shared/types/Book";
import { apiClient } from "./apiClient";

const path = {
  books: '/books',
  recommended: '/recommendations',
  guestRecommended: '/guest/recommendations',
  donated: '/donated',
  taken: '/received',
}

export const getAllBooks = async () => {
  return apiClient.get<BookResponse>(`${path.books}`);
}

export const getBooks = async (search: string = '') => {
  return apiClient.get<BookResponse>(`${path.books}${search}`);
}

export const getBook = async (id: number) => {
  return apiClient.get<Book>(`${path.books}/${id}`);
}

export const postBook = async (data: BookData) => {
  console.log(JSON.stringify(data));
  
  return apiClient.post<Book>(`${path.books}`, data);
}

export const getRecommended = async (authorized: boolean = false) => {
  const url = authorized ? path.recommended : path.guestRecommended;

  return apiClient.get<Book[]>(`${url}`);
}

export const getDonated = async () => {
  return apiClient.get<Book[]>(`${path.donated}`);
}

export const getTaken = async () => {
  return apiClient.get<Book[]>(`${path.taken}`);
}

export const addImage = async (
  bookId: number,
  file: File,
) => {
  const data = { image: file };

  return apiClient.put(`${path.books}/${bookId}/image`, data);
}

export const bookService = {
  getAllBooks,
  getBooks,
  getBook,
  postBook,
  getRecommended,
  getDonated,
  getTaken,
  addImage,
}

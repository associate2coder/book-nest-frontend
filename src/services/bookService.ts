import { Book } from "../shared/types/Book";
import { apiClient } from "./apiClient";

export const getBooks = async () => {
  return apiClient.get<Book[]>('api/bookss.json');
};

export const bookService = {
  getBooks,
}

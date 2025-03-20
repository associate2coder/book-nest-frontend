import { Book } from "../shared/types/Book";
import { apiClient } from "./apiClient";

// NOTE!!! API has 'favorites' NOT 'favoUrites'!
export const PATH = '/favorites';

export const add = async (book: Book) => {
  const bookId = book.id;

  apiClient.post(PATH, { bookId });
}

export const get = () => {
  return apiClient.get<Book[]>(PATH);
}

export const remove = async (book: Book) => {
  const bookId = book.id;

  apiClient.delete(`${PATH}/${bookId}`);
}

export const favouriteService = {
  add,
  get,
  remove,
}

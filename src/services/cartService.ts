import { Book } from "../shared/types/Book";
import { CartResponse } from "../shared/types/CartResponse";
import { apiClient } from "./apiClient";

export const PATH = '/shopping-carts';

export const add = async (book: Book) => {
  apiClient.post(`${PATH}/books/${book.id}`);
}

export const get = () => {
  return apiClient.get<CartResponse>(PATH);
}

export const remove = async (book: Book) => {
  apiClient.delete(`${PATH}/books/remove/${book.id}`);
}

export const cartService = {
  add,
  get,
  remove,
}

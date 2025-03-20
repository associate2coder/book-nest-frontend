import { Book } from "./Book";

export interface CartResponse {
  id: number;
  userId: number;
  books: Book[];
}
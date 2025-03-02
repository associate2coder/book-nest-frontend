import { Book } from "../shared/types/Book";
// import { apiClient } from "./apiClient";

export const getBooks = async () => {
  console.log('books are retrieved from server');
  
  // return apiClient.get<Book[]>('api/books.json');

  const promise: Promise<Book[]> = fetch('api/books.json')
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })

    return promise;
};

export const bookService = {
  getBooks,
}

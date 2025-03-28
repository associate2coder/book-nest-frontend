import { Book } from "../../../shared/types/Book";

const sortStrings = (str1: string, str2: string, desc: boolean = false) => {
  const direction = desc ? -1 : 1;

  return direction * str1.toLowerCase()
    .localeCompare(str2.toLowerCase());
};

const sortNumbers = (num1: number, num2: number, desc: boolean = false) => {
  const direction = desc ? -1 : 1;

  return direction * (num1 - num2);
}

const sortOldestFirst = (book: Book, other: Book) => {
  console.log('sortOldestFirst');

  return sortNumbers(book.releaseYear, other.releaseYear, false);
}

const sortNewestFirst = (book: Book, other: Book) => {
  console.log('sortNewestFirst');

  return sortNumbers(book.releaseYear, other.releaseYear, true);
}

const sortAlphabeticallyAsc = (book: Book, other: Book) => {
  console.log('sortAlphabeticallyAsc');

  return sortStrings(book.title, other.title, false);
}

const sortAlphabeticallyDesc = (book: Book, other: Book) => {
  console.log('sortAlphabeticallyDesc');

  return sortStrings(book.title, other.title, true);
}

export const sortOptions = {
  'releaseYear:desc': sortNewestFirst,
  'releaseYear:asc': sortOldestFirst,
  'title:asc': sortAlphabeticallyAsc,
  'title:desc': sortAlphabeticallyDesc,
}

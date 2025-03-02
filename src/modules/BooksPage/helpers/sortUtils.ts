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
  return sortNumbers(book.year, other.year, false);
}

const sortNewestFirst = (book: Book, other: Book) => {
  return sortNumbers(book.year, other.year, true);
}

const sortAlphabeticallyAsc = (book: Book, other: Book) => {
  return sortStrings(book.title, other.title, false);
}

const sortAlphabeticallyDesc = (book: Book, other: Book) => {
  return sortStrings(book.title, other.title, true);
}

export const sortOptions = {
  'age-desc': sortNewestFirst,
  'age-asc': sortOldestFirst,
  'title-asc': sortAlphabeticallyAsc,
  'title-desc': sortAlphabeticallyDesc,
}

export interface Book {
  id: number;
  title: string;
  author: string;
  condition: string;
  genres: string[];
  slug: string;
  releaseYear: number;
  format: string;
  image: string;
  description: string;
}

export interface BookResponse {
  content: Book[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  }
  totalPages: number;
}

export type BookData = Pick<Book, 
  | 'author'
  | 'title'
  | 'condition'
  | 'releaseYear'
  | 'format'
  | 'description'
> & { genreIds: number[] };;

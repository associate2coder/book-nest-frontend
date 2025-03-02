import React, { useMemo } from 'react';
import { BookCard } from '../../../../shared/components/BookCard';
import { Book } from '../../../../shared/types/Book';
import { Pagination } from '../Pagination';
import { RefinementFilters } from '../RefinementFilters';
import styles from './BookList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { BOOKS_PER_PAGE } from '../../../../config/constants';

interface Props {
  books: Book[];
}

export const BookList: React.FC<Props> = React.memo(
  ({ books }) => {

    const [searchParams] = useSearchParams();

    const currentPage = useMemo(() => {
      return Number(searchParams.get('page') || '1');
    }, [searchParams]);

    const paginationSlice = useMemo(() => {
      const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
      const endIndex = Math.min(currentPage * BOOKS_PER_PAGE, books.length);
      
      return books.slice(startIndex, endIndex);
    }, [books, currentPage])

    return (
      <div className={styles.listContainer}>
        <RefinementFilters />

        <div className={styles.list}>
          {paginationSlice.map(book => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>

        <Pagination />
      </div>
    );
  }
);

BookList.displayName = 'BookList';


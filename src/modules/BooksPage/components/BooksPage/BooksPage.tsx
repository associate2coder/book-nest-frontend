import styles from './BooksPage.module.scss';
import { FilterMenu } from '../FilterMenu';
import { BookList } from '../BookList';
import { Loader } from '../../../../shared/components/Loader';
import { useEffect, useRef, useState } from 'react';
import { useFilters } from '../../hooks/useFilters';
import { bookService } from '../../../../services/bookService';
import { Book } from '../../../../shared/types/Book';

export const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const notFirstLoadRef = useRef<boolean>(null);
  const filterSearch = useFilters();

  useEffect(() => {}, [error])

  useEffect(() => {
    console.log('filterSearch changed', { filterSearch });
  }, [filterSearch])
  

  useEffect(() => {
    console.log('books to be updated');

    if (!notFirstLoadRef.current) {
      notFirstLoadRef.current = true;
      setLoaded(false);
    }

    setError('');

    bookService.getBooks(filterSearch)
      .then(response => {
        setBooks(response.content);
        setTotalPages(response.totalPages);
      })
      .catch(() => setError('Failed to retrieve books from server'))
      .finally(() => {
        setLoaded(true);
      })
  }, [filterSearch]);

  return (
    <div className={styles.booksPage}>

      <h1 hidden>Books</h1>
      
      <div className={styles.pageContent}>
        <FilterMenu />

        {!loaded && <Loader />}

        {loaded && <BookList books={books} totalPages={totalPages}/>}
      </div>
    </div>
  );
};
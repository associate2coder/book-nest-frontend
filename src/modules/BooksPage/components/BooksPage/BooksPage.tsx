// import cn from 'classnames'
import styles from './BooksPage.module.scss';
import { FilterMenu } from '../FilterMenu';
import { BookList } from '../BookList';
// import { useAppSelector } from '../../../../shared/hooks/storeHooks';
// import { Book } from '../../../../shared/types/Book';
// import { DEFAULT_SORTBY } from '../../../../config/constants';
// import { sortOptions } from '../../helpers/sortUtils';
// import { bookService } from '../../../../services/bookService';
import { Loader } from '../../../../shared/components/Loader';
// import { useFilters } from '../../hooks/useFilters';
import { useEffect, useRef, useState } from 'react';
import { useFilters } from '../../hooks/useFilters';
import { bookService } from '../../../../services/bookService';
import { Book } from '../../../../shared/types/Book';

export const BooksPage: React.FC = () => {
  // const { items: books } = useAppSelector(state => state.books);
  const [books, setBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const notFirstLoadRef = useRef<boolean>(null);
  // const [searchParams] = useSearchParams();
  const filterSearch = useFilters();

  useEffect(() => {}, [error])
  
  // const filterIds = useMemo(() => {
  //   return Object
  //   .values(filters)
  //   .map(filter => filter.id);
  // }, [])




  useEffect(() => {
    if (!notFirstLoadRef.current) {
      notFirstLoadRef.current = true;
      setLoaded(false);
    }

    setError('');

    // const filterSearch = filters.search;

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

  // const existingFilters = useMemo(() => {
  //   return Object.values(filters).reduce((acc, filter) => {
  //     const { id: filterId, values: filterValues } = filter;
  //     const selected = searchParams.getAll(filterId);
  
  //     acc[filterId] = selected.length > 0 ? selected : filterValues;
  //     return acc;
  //   }, {} as Record<string, string[]>);
  //   }, [searchParams])

  // const filteredBooks = useMemo(() => {
  //   const applicableFilters = existingFilters;
  //   const query = searchParams.get('query')?.toLocaleLowerCase() || '';
  //   const sortBy = searchParams.get('sortby') || DEFAULT_SORTBY;

  //   const filtered = books.filter(book => {
  //     const filtersApplied = Object.entries(applicableFilters).every(([key, values]) => {
  //       const bookValue = book[key as keyof Book] as string | string[];        

  //       return values.length === 0 || 
  //         (typeof bookValue === "string" 
  //           ? values.includes(bookValue) 
  //           : bookValue.some(value => values.includes(value)));
  //       }
  //     )

  //     const queryApplied = book.author.toLocaleLowerCase().includes(query) ||
  //       book.title.toLocaleLowerCase().includes(query);

  //     return filtersApplied && queryApplied;
  //   });

  //   return filtered.sort(sortOptions[sortBy as keyof typeof sortOptions]);
  // }, [books, existingFilters, searchParams]);

  // const availableFilters = useMemo(() => {
  //   return filterIds.reduce((acc, filter) => ({
  //     ...acc,
  //     [filter]: [...new Set(filteredBooks.map(book => String(book[filter as keyof Book])))]
  //   }), {} as Record<string, string[]>);
  //   }, [filteredBooks, filterIds]);

  return (
    <div className={styles.booksPage}>

      <h1 hidden>Books</h1>
      
      <div className={styles.pageContent}>
        {/* <FilterMenu availableFilters={availableFilters}/> */}
        <FilterMenu />

        {!loaded && <Loader />}

        {loaded && <BookList books={books} totalPages={totalPages}/>}
      </div>
    </div>
  );
};

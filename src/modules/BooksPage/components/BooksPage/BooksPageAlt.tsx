import styles from './BooksPage.module.scss';
import { FilterMenu } from '../FilterMenu';
import { BookList } from '../BookList';
import { BOOKS_PER_PAGE, DEFAULT_SORTBY } from '../../../../config/constants';
import { sortOptions } from '../../helpers/sortUtils';
import { Loader } from '../../../../shared/components/Loader';
import { useMemo } from 'react';
import { Book } from '../../../../shared/types/Book';
import { useAppSelector } from '../../../../shared/hooks/storeHooks';
import { useLocation, useSearchParams } from 'react-router-dom';

export const BooksPageAlt: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const filters = useAppSelector(state => state.filters.filters); 
  // const { items: favourites, loaded } = useAppSelector(state => state.fav);
  // const { items: allBooks } = useAppSelector(state => state.books);
  // const favourites: Book[] = allBooks;
  // const givenBooks: Book[] = allBooks;
  // const takenBooks: Book[] = allBooks;

  const { loaded: favLoaded, items: favourites } = useAppSelector(state => state.fav);
  const { 
    donated: givenBooks, 
    taken: takenBooks, 
    loaded: profileLoaded
  } = useAppSelector(state => state.profile);

  const loaded = profileLoaded || favLoaded;
  
  const currentPage = useMemo(() => {
    const segments = location.pathname.split('/');
    const pages = ['given', 'taken', 'favourites'];

    const result = pages.find(page => segments.includes(page));

    return result ? result : 'books';
  }, [location.pathname]);
  
  const books = useMemo(() => {
    switch (currentPage) {
      case 'given': 
        return givenBooks;

      case 'taken': 
        return takenBooks;

      case 'favourites':
        return favourites;

      default:
        return [];
    }
  }, [currentPage, favourites, givenBooks, takenBooks]);

  const existingFilters = useMemo(() => {
    return Object.values(filters).reduce((acc, filter) => {
      const { id: filterId, values: filterCategory } = filter;
      const selected = searchParams.getAll(filterId);
      const filterValues = filterCategory.map(category => category.name);
  
      acc[filterId] = selected.length > 0 ? selected : filterValues;
      return acc;
    }, {} as Record<string, string[]>);
    }, [filters, searchParams])

  const filteredBooks = useMemo(() => {

    const applicableFilters = existingFilters;
    const query = searchParams.get('query')?.toLocaleLowerCase() || '';
    const sortBy = searchParams.get('sort') || DEFAULT_SORTBY;

    const filtered = books.filter(book => {
      const filtersApplied = Object.entries(applicableFilters).every(([key, values]) => {
        // const bookValue = book[key as keyof Book] as string | string[];

        // FIX
        let bookValue = book[key as keyof Book] as string | string[];

        if (key === 'format' && !bookValue) {
          bookValue = 'Paperback';
        }

        return bookValue && values.length === 0 || 
          ( typeof bookValue === "string" 
            ? values.includes(bookValue) 
            : bookValue.some(value => values.includes(value)));
        }
      )

      const queryApplied = book.author.toLocaleLowerCase().includes(query) ||
        book.title.toLocaleLowerCase().includes(query);

      return filtersApplied && queryApplied;
    });

    return filtered.sort(sortOptions[sortBy as keyof typeof sortOptions]);
  }, [books, existingFilters, searchParams]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  }, [filteredBooks.length]);

  return (
    <div className={styles.booksPage}>

      <h1 hidden>Books</h1>
      
      <div className={styles.pageContent}>
        {/* <FilterMenu availableFilters={availableFilters}/> */}
        <FilterMenu />

        {!loaded && <Loader />}

        {loaded && <BookList books={filteredBooks} totalPages={totalPages} pagination={true} />}
      </div>
    </div>
  );
};

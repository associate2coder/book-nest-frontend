// import cn from 'classnames'
import styles from './BooksPage.module.scss';
import { FilterMenu } from '../FilterMenu';
import { BookList } from '../BookList';
import { useAppSelector } from '../../../../shared/hooks/storeHooks';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { filters } from '../../config/filters';
import { Book } from '../../../../shared/types/Book';
import { DEFAULT_SORTBY } from '../../../../config/constants';
import { sortOptions } from '../../helpers/sortUtils';

export const BooksPage: React.FC = () => {
  const { items: books } = useAppSelector(state => state.books);

  const [searchParams] = useSearchParams();

  const filterIds = useMemo(() => {
    return Object
    .values(filters)
    .map(filter => filter.id);
  }, [])

  const existingFilters = useMemo(() => {
    return Object.values(filters).reduce((acc, filter) => {
      const { id: filterId, values: filterValues } = filter;
      const selected = searchParams.getAll(filterId);
  
      acc[filterId] = selected.length > 0 ? selected : filterValues;
      return acc;
    }, {} as Record<string, string[]>);
    }, [searchParams])

  const filteredBooks = useMemo(() => {
    const applicableFilters = existingFilters;
    const query = searchParams.get('query')?.toLocaleLowerCase() || '';
    const sortBy = searchParams.get('sortby') || DEFAULT_SORTBY;

    const filtered = books.filter(book => {
      const filtersApplied = Object.entries(applicableFilters).every(([key, values]) => 
          values.length === 0 || values.includes(book[key as keyof Book] as string)
      )

      const queryApplied = book.author.toLocaleLowerCase().includes(query) ||
        book.title.toLocaleLowerCase().includes(query);

      return filtersApplied && queryApplied;
    });

    return filtered.sort(sortOptions[sortBy as keyof typeof sortOptions]);
  }, [books, existingFilters, searchParams]);



  const availableFilters = useMemo(() => {
    return filterIds.reduce((acc, filter) => ({
      ...acc,
      [filter]: [...new Set(filteredBooks.map(book => String(book[filter as keyof Book])))]
    }), {} as Record<string, string[]>);
    }, [filteredBooks, filterIds]);

  return (
    <div className={styles.booksPage}>
      <h1 hidden>Books</h1>
      
      <div className={styles.pageContent}>
        <FilterMenu availableFilters={availableFilters}/>

        <BookList books={filteredBooks}/>
      </div>
    </div>
  );
}
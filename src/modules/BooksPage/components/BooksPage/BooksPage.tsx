// import cn from 'classnames'
import styles from './BooksPage.module.scss';
import { FilterMenu } from '../FilterMenu';
import { BookList } from '../BookList';

export const BooksPage: React.FC = () => {
  return (
    <div className={styles.booksPage}>
      <h1 hidden>Books</h1>
      
      <div className={styles.pageContent}>
        <FilterMenu />

        <BookList />
      </div>
    </div>
  );
}
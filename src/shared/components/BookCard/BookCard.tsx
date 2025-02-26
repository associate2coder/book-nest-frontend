import { Book } from '../../types/Book';
import styles from './BookCard.module.scss';

interface Props {
  book: Book;
}

export const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.bookTitle}></h3>
      </div>
    </div>
  );
}

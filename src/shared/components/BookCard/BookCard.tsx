import { Book } from '../../types/Book';
import styles from './BookCard.module.scss';

interface Props {
  book: Book;
}

export const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <p className={styles.author}>{book.author}</p>

        <h3 className={styles.bookTitle}>{book.title}</h3>
      </div>
      <div className={styles.imageWrapper}>
        <img src={book.image} alt={`${book.title} image`} className={styles.image} />
      </div>
    </div>
  );
}

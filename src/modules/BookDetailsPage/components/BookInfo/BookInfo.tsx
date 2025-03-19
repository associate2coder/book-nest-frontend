import { AddButtonsBlock } from '../../../../shared/components/AddButtonsBlock';
import { Book } from '../../../../shared/types/Book';
import styles from './BookInfo.module.scss';

interface Props {
  book: Book;
}

export const BookInfo: React.FC<Props> = ({ book }) => {
  return (
    <div className={styles.mainInfo}>
      <header className={styles.bookInfo}>
        <p className={styles.author}>{book.author}</p>

        <h1 className={styles.title}>{book.title}</h1>

        <p className={styles.bookCondition}>{book.condition}</p>
      </header>

      <div className={styles.buttons}>
        <p className={styles.format}>{book.format}</p>
        
        {book && <AddButtonsBlock book={book} />}
      </div>
    </div>
  );
}
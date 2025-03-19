import { Link, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../../config/constants';
import { Book } from '../../types/Book';
import { AddButtonsBlock } from '../AddButtonsBlock';
import placeholderImage from '@assets/images/book_image_240x360.svg';
import styles from './BookCard.module.scss';

interface Props {
  book: Book;
}

export const BookCard: React.FC<Props> = ({ book }) => {
  const location = useLocation();
  const image = API_BASE_URL + `/books/image/${book.id}`;

  return (
    <div className={styles.card}>
      <Link 
        to={`/books/${book.slug}`} 
        state={{ from: location.pathname, search: location.search }}
        className={styles.cardHeader}
      >
        <p className={styles.author}>{book.author}</p>

        <h3 className={styles.bookTitle}>{book.title}</h3>
      </Link>

      <Link 
        to={`/books/${book.slug}`} 
        state={{ from: location.pathname, search: location.search }}
        className={styles.imageWrapper}
      >
        <img 
          src={image} 
          alt={`${book.title} image`} 
          className={styles.image} 
          onError={e => (e.currentTarget.src = placeholderImage)}
        />
      </Link>

      <div className={styles.addButtons}>
        <AddButtonsBlock book={book}/>
      </div>
    </div>
  );
}

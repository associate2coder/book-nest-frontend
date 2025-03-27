import { API_BASE_URL } from '../../../config/constants';
import { Book } from '../../types/Book';
import styles from './BookCartItem.module.scss';
import cn from 'classnames';

interface Props {
  book: Book;
}

export const BookCartItem: React.FC<Props> = ({ book }) => {
  const image = API_BASE_URL + `/books/image/${book.id}`;
  const placeholderImage = 'https://placehold.co/130x200/png';
  
  return (
    <div className={cn(styles.bookCartItem)}>
      <div className={styles.infoWrapper}>
        <p className={styles.author}>{book.author}</p>

        <h4 className={styles.title}>{book.title}</h4>

        <p className={styles.condition}>{book.condition}</p>

        <p className={styles.format}>{book.format}</p>
      </div>

      <div className={styles.imageWrapper}>
        <img 
          src={image} 
          alt={`${book.title} image`} 
          onError={e => (e.currentTarget.src = placeholderImage)}
          className={styles.image} 
        />
      </div>
    </div>
  );
}
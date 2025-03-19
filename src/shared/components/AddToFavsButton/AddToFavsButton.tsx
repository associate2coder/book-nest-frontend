import { useMemo } from 'react';
import { Book } from '../../types/Book';
import styles from './AddToFavsButton.module.scss';
// import cn from 'classnames';
import heart from '@assets/icons/heart.svg';
import heartFilled from '@assets/icons/heart_filled.svg';
import { useAppSelector } from '../../hooks/storeHooks';

interface Props {
  book: Book;
}

export const AddToFavsButton: React.FC<Props> = ({ book }) => {
  const favItems: Book[] = useAppSelector(state => state.fav);
  // const favItems: Book[] = [];

  const bookInFavs = useMemo(() => {
    return favItems.includes(book);
  }, [book, favItems]);

  const handleFavButtonClick = () => {};

  const icon = bookInFavs ? heartFilled : heart;
  const text = `${bookInFavs ? 'Remove from' : 'Add to'} wishlist`;

  return (
    <div className={styles.container} onClick={handleFavButtonClick} >
      <img src={icon} alt="heart icon" className={styles.icon} />

      <span className={styles.text}>{text}</span>
    </div>
  )
}
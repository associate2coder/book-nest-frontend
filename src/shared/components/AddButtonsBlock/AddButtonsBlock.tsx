import { PrimaryButton } from '../PrimaryButton';
import { AddToFavsButton } from '../AddToFavsButton';
import styles from './AddButtonsBlock.module.scss';
import { Book } from '../../types/Book';
import { useAppSelector } from '../../hooks/storeHooks';
import { useMemo } from 'react';

interface Props {
  book: Book;
}

export const AddButtonsBlock: React.FC<Props> = ({ book }) => {
  const handleCartButtonClick = () => {};

  const cartItems = useAppSelector(state => state.cart);

  const bookInCart = useMemo(() => {
    return cartItems.includes(book);
  }, [book, cartItems])
  
  return (
    <div className={styles.buttons}>
      <PrimaryButton 
        text="Request a book" 
        onClick={handleCartButtonClick} 
        selected={bookInCart} 
      />

      <AddToFavsButton book={book} />
    </div>
  );
}

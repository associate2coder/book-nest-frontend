import { PrimaryButton } from '../PrimaryButton';
import { AddToFavsButton } from '../AddToFavsButton';
import styles from './AddButtonsBlock.module.scss';
import { Book } from '../../types/Book';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { useCallback, useMemo } from 'react';
import { addCart, removeCart } from '../../../store/cartSlice';

interface Props {
  book: Book;
}

export const AddButtonsBlock: React.FC<Props> = ({ book }) => {
  const { books: cartItems } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const bookInCart = useMemo(() => {
    return cartItems.includes(book);
  }, [book, cartItems])

  const handleCartButtonClick = useCallback(() => {
    const actionFn = bookInCart ? removeCart : addCart;

    dispatch(actionFn(book));
  }, [book, bookInCart, dispatch]);
  
  return (
    <div className={styles.buttons}>
      <PrimaryButton 
        text="Request a book" 
        onClick={handleCartButtonClick} 
        selected={bookInCart}
        selectedText="Requested" 
      />

      <AddToFavsButton book={book} />
    </div>
  );
}

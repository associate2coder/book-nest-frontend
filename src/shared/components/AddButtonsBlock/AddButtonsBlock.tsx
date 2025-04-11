import { PrimaryButton } from '../PrimaryButton';
import { AddToFavsButton } from '../AddToFavsButton';
import styles from './AddButtonsBlock.module.scss';
import { Book } from '../../types/Book';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { useCallback, useMemo } from 'react';
import { addCart, removeCart, setConfirmation } from '../../../store/cartSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/hooks/useAuth';

interface Props {
  book: Book;
}

export const AddButtonsBlock: React.FC<Props> = ({ book }) => {
  const { books: cartItems } = useAppSelector(state => state.cart);
  const { taken } = useAppSelector(state => state.profile);
  const authorised = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onPage = useMemo(() => {
    return location.pathname.includes(book.slug);
  }, [book.slug, location.pathname])

  const bookInCart = useMemo(() => {
    const ids = cartItems.map(book => book.id);
    
    return ids.includes(book.id);
  }, [book, cartItems])

  // return TRUE if login needed
  const loginIfUnauthorised = useCallback(() => {
    if (!authorised) {
      setTimeout(() => navigate('/login', {
        replace: true,
        state: {
          from: location.pathname,
          search: location.search,
        }
      }), 0);

      return true;
    }

    return false;
  }, [authorised, location.pathname, location.search, navigate])


  const handleCartButtonClick = useCallback(() => {
    if (loginIfUnauthorised()) {
      return;
    }

    const actionFn = bookInCart ? removeCart : addCart;

    if (actionFn === addCart) {
      dispatch(setConfirmation(book));
    }

    dispatch(actionFn(book));
  }, [book, bookInCart, dispatch, loginIfUnauthorised]);

  // Check if Book is in Taken
  // if so, you can't request it
  const inTaken = useMemo(() => {
    if (!taken || taken.length === 0) {
      return false;
    }

    return taken.map(book => book.id).includes(book.id);
  }, [book.id, taken])

  // If in taken, explore the book OR other books
  const handleExploreButtonClick = useCallback(() => {

    const navitageTo = onPage
      ? `/books`
      : `/books/${book.slug}`;
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
    
    navigate(
      navitageTo, 
      { state: {
        from: location.pathname,
        search: location.search,
      } },
    );  

  }, [book.slug, location.pathname, location.search, navigate, onPage]);

  const takenButtonText = useMemo(() => {
    return onPage 
      ? 'Explore more books'
      : 'Explore the book';
  }, [onPage]);
  
  return (
    <div className={styles.buttons}>
      {inTaken ? (
        <PrimaryButton 
          text={takenButtonText}
          onClick={handleExploreButtonClick} 
          selected={(inTaken)}
          selectedText={takenButtonText}
        />
      ) : (
        <PrimaryButton 
          text="Request a book" 
          onClick={handleCartButtonClick} 
          selected={bookInCart}
          selectedText="Requested" 
        />
      )}

      <AddToFavsButton book={book} />
    </div>
  );
}

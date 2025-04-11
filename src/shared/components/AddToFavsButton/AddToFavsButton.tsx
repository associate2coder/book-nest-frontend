import { useCallback, useMemo } from 'react';
import { Book } from '../../types/Book';
import styles from './AddToFavsButton.module.scss';
// import cn from 'classnames';
import heart from '@assets/icons/heart.svg';
import heartFilled from '@assets/icons/heart_filled.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addFav, removeFav } from '../../../store/favSlice';
import { useAuth } from '../../../features/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface Props {
  book: Book;
}

export const AddToFavsButton: React.FC<Props> = ({ book }) => {
  const {items: favItems} = useAppSelector(state => state.fav);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorised = useAuth();

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
    }, [authorised, navigate])

  const bookInFavs = useMemo(() => {
    return favItems.includes(book);
  }, [book, favItems]);

  const handleFavButtonClick = () => {
    if (loginIfUnauthorised()) {
      return;
    }

    const actionFn = bookInFavs ? removeFav: addFav;
    
    dispatch(actionFn(book));
  };

  const icon = bookInFavs ? heartFilled : heart;
  const text = `${bookInFavs ? 'Remove from' : 'Add to'} wishlist`;

  return (
    <div className={styles.container} onClick={handleFavButtonClick} >
      <img src={icon} alt="heart icon" className={styles.icon} />

      <span className={styles.text}>{text}</span>
    </div>
  )
}
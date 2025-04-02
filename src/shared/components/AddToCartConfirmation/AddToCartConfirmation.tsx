import { useCallback } from 'react';
import { Modal } from '../Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import styles from './AddToCartConfirmation.module.scss';
import { setConfirmation } from '../../../store/cartSlice';
import { SecondaryButton } from '../SecondaryButton';
import { PrimaryButton } from '../PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config/constants';
import placeholderImage from '@assets/images/book_image_240x360.svg';


export const AddToCartConfirmation: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { confirmation: book } = useAppSelector(state => state.cart);
  const image = API_BASE_URL + `/books/image/${book?.id}`;

  const close = useCallback(() => {
    dispatch(setConfirmation(null));
  }, [dispatch]);

  const navigateToCart = useCallback(() => {    
    setTimeout(() => navigate('/cart', {
      state: { from: location.pathname, search: location.search }
    }), 0);
    
    close();
  }, [close, navigate]);

  if (book) {
    return (
      <Modal overlay={true}>
        <div className={styles.container}>
          <p className={styles.message}>Item successfully added to your cart</p>

          <div className={styles.book}>
            <div className={styles.leftSide}>
              <div className={styles.info}>
                <p className={styles.author}>{book?.author}</p>

                <h2 className={styles.title}>{book?.title}</h2>

                <p className={styles.condition}>{book?.condition}</p>

                <p className={styles.format}>{book?.format}</p>
              </div>

              <div className={styles.buttons}>
                <PrimaryButton text="View cart" onClick={navigateToCart} />

                <SecondaryButton text="Continue browsing" onClick={close} />
              </div>
            </div>

            <div className={styles.imageWrapper}>
              <img 
                src={image} 
                alt={`${book?.title} image`} 
                onError={e => (e.currentTarget.src = placeholderImage)}
              />
            </div>
          </div>
        </div>
      </Modal>
    )
  }
};

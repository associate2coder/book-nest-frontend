import { useEffect, useState } from 'react';
import { CartList } from '../../../../shared/components/CartList';
import { Loader } from '../../../../shared/components/Loader';
import { useAppSelector } from '../../../../shared/hooks/storeHooks';
import { DeliveryForm } from '../DeliveryForm';
import styles from './CartPage.module.scss';
import { ConfirmationMessage } from '../../../../shared/components/ConfirmationMessage';
import { Slider } from '../../../../shared/components/Slider';
import cn from 'classnames';

export const CartPage: React.FC = () => {
  const { loaded, books } = useAppSelector(state => state.cart);
  const cartEmpty = books.length === 0;
  const [ submitted, setSubmitted ] = useState(false);
  const { recommended } = useAppSelector(state => state.books);

  const isEmpty = loaded && cartEmpty && !submitted;
  const showCart = loaded && !cartEmpty && !submitted;

  useEffect(() => {
    return () => {
      setSubmitted(false);
    }
  }, []);
  
  return (
    <div className={cn(styles.cartPage, {
      [styles.submitted]: submitted,
    })}>

      {submitted && (
        <>
          <ConfirmationMessage type="order"/>

          <Slider title="Explore more books" books={recommended} />
        </>
      )}

      {!loaded && <Loader />}

      {isEmpty && (
        <p>Your shopping bag is empty</p>
      )}

      {showCart && (
        <>
          <h2 className={styles.pageTitle}>Review your bag</h2>

          <CartList />

          <DeliveryForm complete={() => setSubmitted(true) }/>
        </>
        )}
    </div>
  )
};
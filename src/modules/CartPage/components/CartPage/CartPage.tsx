import { CartList } from '../../../../shared/components/CartList';
import { Loader } from '../../../../shared/components/Loader';
import { useAppSelector } from '../../../../shared/hooks/storeHooks';
import { DeliveryForm } from '../DeliveryForm';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { loaded, books } = useAppSelector(state => state.cart);
  const cartEmpty = books.length === 0;
  
  return (
    <div className={styles.cartPage}>

      {!loaded && <Loader />}

      {loaded && cartEmpty && (
        <p>Your shopping bag is empty</p>
      )}

      {loaded && !cartEmpty && (
        <>
          <h2 className={styles.pageTitle}>Review your bag</h2>

          <CartList />

          <DeliveryForm />
        </>
        )}
    </div>
  )
};
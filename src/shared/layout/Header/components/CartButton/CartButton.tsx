import styles from './CartButton.module.scss';
import cart from '@assets/icons/cart.svg';

export const CartButton: React.FC = () => {
  return (
    <div className={styles.cartButton}>
      <img src={cart} alt={`cart icon`} className={styles.icon} />
    </div>
  );
}


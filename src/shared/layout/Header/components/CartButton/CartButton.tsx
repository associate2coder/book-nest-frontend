import styles from './CartButton.module.scss';
import cart from '@assets/icons/cart.svg';
import { useAppSelector } from '../../../../hooks/storeHooks';
import { useMemo } from 'react';
import { Counter } from '../Counter';

interface Props {
  onClick: () => void;
}

export const CartButton: React.FC<Props> = ({ onClick }) => {
  const { books } = useAppSelector(state => state.cart);
  const hasCounter = useMemo(() => books.length > 0, [books.length]);
  
  return (
    <button className={styles.cartButton} onClick={onClick}>
      <img src={cart} alt={`cart icon`} className={styles.icon} />

      {hasCounter && <Counter value={books.length}/>}

    </button>
  );
}


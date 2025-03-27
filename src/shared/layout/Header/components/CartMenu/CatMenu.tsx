import { useNavigate } from 'react-router-dom';
import { CartList } from '../../../../components/CartList';
import { PrimaryButton } from '../../../../components/PrimaryButton';
import { SecondaryButton } from '../../../../components/SecondaryButton';
import styles from './CartMenu.module.scss';
import { useAppSelector } from '../../../../hooks/storeHooks';
import { useMemo } from 'react';

interface Props {
  close: () => void;
}

export const CartMenu: React.FC<Props> = ({ close }) => {
  const navigate = useNavigate();
  const { books } = useAppSelector(state => state.cart);
  const cartEmpty = useMemo(() => books.length === 0, [books.length]);

  const navigateToCart = () => {
    close();
    
    navigate('/cart', {
      state: { from: location.pathname, search: location.search },
    })
  }


  return (
    <div className={styles.cartMenu}>
      {cartEmpty && <p>Shopping bag is empty</p>}

      {!cartEmpty && <CartList />}

      <div className={styles.buttons}>
        <PrimaryButton text="Checkout" type='button' onClick={navigateToCart} />
                  
        <SecondaryButton text="Cancel" onClick={close}/>
      </div>
      
    </div>
  );
};
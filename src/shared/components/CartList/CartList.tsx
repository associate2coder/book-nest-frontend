import { useMemo } from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import { BookCartItem } from '../BookCartItem';
import styles from './CartList.module.scss';
import cn from 'classnames';

interface Props {
  modal?: boolean;
}


export const CartList: React.FC<Props> = ({ modal = false }) => {
  const { books } = useAppSelector(state => state.cart);

  const lastIndex = useMemo(() => {
    return books.length - 1;
  }, [books.length])
    


  return (
    <div className={cn(styles.cart, {
      [styles.modal]: modal,
    })}>
     {books.map((book, i) => (
      <div className={styles.item} key={`cart-${book.id}`}>
        <BookCartItem book={book} />

        {i !== lastIndex && <div className='divider'></div>}
      </div>
      ))}
    </div>
  );
};
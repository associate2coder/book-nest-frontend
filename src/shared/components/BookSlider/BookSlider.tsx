import { useRef } from 'react';
import { Book } from '../../types/Book';
import { BookCard } from '../BookCard';
import styles from './BookSlider.module.scss';
import leftIcon from '@assets/icons/arrow-left.svg';
import rightIcon from '@assets/icons/arrow-right.svg';
import cn from 'classnames';


interface Props {
  books: Book[];
}

export const BookSlider: React.FC<Props> = ({ books }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const isLeftDisabled = () => {
    const slider = sliderRef.current;

    if (!slider) {
      return true;
    }

    return slider.scrollLeft === 0;
  };

  const isRightDisabled = () => {
    const slider = sliderRef.current;

    if (!slider) {
      return true;
    }

    return slider.scrollLeft >= slider.scrollWidth;
  };

  const handleNext = () => {};

  const handleBack = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.slider} ref={sliderRef}>
        {books.map(book => {
          return (
            <BookCard book={book} key={book.id} />
          )
        })}
      </div>

      <div className={styles.navigation}>
        <button className={styles.button} onClick={handleBack}>
          <img 
            src={leftIcon} 
            alt="move slider back icon" 
            className={cn(styles.icon, {
              [styles.disabled]: isLeftDisabled(),
            })} 
          />
        </button>

        <button className={styles.button} onClick={handleNext}>
          <img 
            src={rightIcon} 
            alt="move slider forward icon" 
            className={cn(styles.icon, {
              [styles.disabled]: isRightDisabled(),
            })} 
          />
        </button>
      </div>
    </div>
  );
};
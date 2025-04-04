// import cn from 'classnames'
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.scss';
import hero11 from '@assets/images/hero11.png';
import hero12 from '@assets/images/hero12.png';
import hero13 from '@assets/images/hero13.png';
import hero21 from '@assets/images/hero21.png';
import hero22 from '@assets/images/hero22.png';
import hero23 from '@assets/images/hero23.png';
import hero31 from '@assets/images/hero31.png';
import hero32 from '@assets/images/hero32.png';
import hero33 from '@assets/images/hero33.png';
import booksImage1 from '@assets/images/lying_books.svg';
import booksImage2 from '@assets/images/standing_books.svg';
import { SecondaryButton } from '../../../../shared/components/SecondaryButton';
import { HowDoesItWork } from '../HowDoesItWork';

export const HomePage: React.FC = () => {
  const naviate = useNavigate();

  const handleClick = () => {
    naviate('/books');
  }
  
  return (
    <div className={styles.homePage}>
      <div className={styles.titleBlock}>
        <div className={styles.mainPageImage}>
          <div className={styles.col}>
            <img src={hero11} alt="book image 1" />
            <img src={hero12} alt="book image 2" />
            <img src={hero13} alt="book image 3" />
          </div>
          <div className={styles.col}>
            <img src={hero21} alt="book image 4" />
            <img src={hero22} alt="book image 5" />
            <img src={hero23} alt="book image 6" />
          </div>
          <div className={styles.col}>
            <img src={hero31} alt="book image 7" />
            <img src={hero32} alt="book image 8" />
            <img src={hero33} alt="book image 9" />
          </div>
        </div>
        <h1 className={styles.title}>{`Book Nest`}</h1>
        <p className={styles.purpose}>{`Clear your shelves and find your next great read with ease!`}</p>
        <SecondaryButton text={`Explore books!`} onClick={handleClick} />
      </div>

      <div className={styles.quoteBlock}>
        <div className={styles.quoteWrapper}>
          <p className={styles.quote}>
            {`A room without books is like a body without a soul.`}
          </p>

          <p className={styles.quotee}>
            {`– Marcus Tullius Cicero`}
          </p>
        </div>

        <div className={styles.images}>
          <div className={styles.imageWrapper}>
            <img src={booksImage1} alt="books image 1" className={styles.image} />
          </div>

          <div className={styles.imageWrapper}>
            <img src={booksImage2} alt="books image 2" className={styles.image} />
          </div>
        </div>
      </div>

      <HowDoesItWork />


    </div>
  );
};
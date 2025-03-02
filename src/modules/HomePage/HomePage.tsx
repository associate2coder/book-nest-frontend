// import cn from 'classnames'
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.scss';
import mainPagePic from '@assets/images/home_page_image.png';


export const HomePage: React.FC = () => {
  const naviate = useNavigate();

  const handleClick = () => {
    naviate('/books');
  }
  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>Book Nest</h1>
        <p className={styles.purpose}>Clear your shelves and find your next great read with ease!</p>
        <button onClick={handleClick} className={styles.button}>Explore books!</button>
      </div>

      <div className={styles.mainPageImage}>
        <img src={mainPagePic} alt="picture with books" className={styles.image} />
      </div>
    </div>
  );
};
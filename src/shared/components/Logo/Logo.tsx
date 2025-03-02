import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import logo from '@assets/logo/logo.svg';

export const Logo: React.FC = () => {
  return (
    <div className={styles.logoContainer}>
      <Link to="/" className={styles.logoLink}>
        <img src={logo} alt="book nest logo image" className={styles.logoImage}/>
      </Link>
    </div>
  );
}

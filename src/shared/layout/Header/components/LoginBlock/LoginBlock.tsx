// import cn from 'classnames'
import styles from './LoginBlock.module.scss';
import { Link } from 'react-router-dom';

export const LoginBlock: React.FC = () => {
  return (
    <div className={styles.loginBlock}>
      <Link 
        to={'/register'} 
        state={{ from: location.pathname, search: location.search }}
        className={styles.authLink}
      >
        Join Us
      </Link>

      <Link 
        to={'/login'} 
        state={{ from: location.pathname, search: location.search }}
        className={styles.authLink}
      >
        Log In
      </Link>
    </div>
  );
}

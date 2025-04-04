// import cn from 'classnames'
import styles from './LoginPage.module.scss';
import { LoginForm } from '../LoginForm';

export const LoginPage: React.FC = () => {

  return (
    <div className={styles.loginPageContainer}>
      <h2 className={styles.loginTitle}>Log In</h2>

      <LoginForm />

    </div>
  );
}
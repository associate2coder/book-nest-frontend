// import cn from 'classnames'
import styles from './SignUpPage.module.scss';
import { SingUpForm } from '../SignUpForm';

export const SignUpPage: React.FC = () => {

  return (
    <div className={styles.signUpPageContainer}>
      <h1 className={styles.signUpTitle}>Create your account</h1>

      <SingUpForm />
    </div>
  );
}
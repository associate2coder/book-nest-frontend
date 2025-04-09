// import cn from 'classnames'
import styles from './LoginPage.module.scss';
import { LoginForm } from '../LoginForm';
import { useEffect, useRef } from 'react';
import { useAuth } from '../../../../features/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASED_AUTHORISED_ROUTE } from '../../../../config/constants';

export const LoginPage: React.FC = () => {

  const firstMount = useRef<boolean>(null);
  const authorised = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!firstMount.current) {
      firstMount.current = true;
    }

    if (!authorised) {
      return
    }

    const to = location.state?.to ?? BASED_AUTHORISED_ROUTE;

    navigate(to);
  })

  return (
    <div className={styles.loginPageContainer}>
      <h2 className={styles.loginTitle}>Log In</h2>

      <LoginForm />

    </div>
  );
}
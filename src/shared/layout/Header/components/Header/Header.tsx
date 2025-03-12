// import cn from 'classnames'
import styles from './Header.module.scss';
import { Logo } from '../../../../components/Logo/Logo';
import { BackLink } from '../BackLink/BackLink';
import { NavBar } from '../../../NavBar';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { LoginBlock } from '../LoginBlock';
import { useUser } from '../../../../hooks/useUser';
import { ProfileBlock } from '../ProfileBlock';
import { TESTING } from '../../../../../config/constants';

const authPathname = [
  '/login',
  '/register',
]

export const Header: React.FC = () => {
  const location = useLocation();
  const user = useUser();

  const isAuthPathname = useMemo(() => {
    return authPathname.includes(location.pathname) ||
      location.pathname === '';
  }, [location.pathname])

  const authorized = !isAuthPathname && user;

  return (
    <header className={styles.header}>
      <Logo />

      {isAuthPathname && <BackLink />}

      {!isAuthPathname && <NavBar />}

      {!authorized && !TESTING && <LoginBlock />}

      {(authorized || !isAuthPathname && TESTING) && <ProfileBlock />}

    </header>
  );
}

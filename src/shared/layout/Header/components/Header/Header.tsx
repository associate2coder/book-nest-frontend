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

const authPathname = [
  '/login',
  '/register',
]

export const Header: React.FC = () => {
  const location = useLocation();
  const { user, loaded } = useUser();

  const isAuthPathname = useMemo(() => {
    return authPathname.includes(location.pathname) ||
      location.pathname === '';
  }, [location.pathname])


  const isRootPathname = useMemo(() => {
    return location.pathname === '/';
  }, [location.pathname])

  const authorized = !isAuthPathname && loaded && user;

  const showLoginBlock = loaded && !authorized && !isRootPathname;
  const showProfileBlock = authorized || !isAuthPathname || !isRootPathname;

  return (
    <header className={styles.header}>
      <Logo />

      {isAuthPathname && <BackLink />}

      {!isAuthPathname && <NavBar />}

      {showLoginBlock && <LoginBlock />}

      {showProfileBlock && <ProfileBlock />}

      {!loaded || isRootPathname && <div></div>}
    </header>
  );
}

// import cn from 'classnames'
import styles from './Header.module.scss';
import { Logo } from '../../../../components/Logo/Logo';
import { BackLink } from '../BackLink/BackLink';
import { NavBar } from '../../../NavBar';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { LoginBlock } from '../LoginBlock';
import { ProfileBlock } from '../ProfileBlock';
import { useAppSelector } from '../../../../hooks/storeHooks';
import { useAuth } from '../../../../../features/hooks/useAuth';

const authPathname = [
  '/login',
  '/register',
]

export const Header: React.FC = () => {
  const location = useLocation();
  const { loaded, user } = useAppSelector(state => state.profile);
  const authValid = useAuth();

  const isAuthPathname = useMemo(() => {
    return authPathname.includes(location.pathname) ||
      location.pathname === '';
  }, [location.pathname])

  const isRootPathname = location.pathname === '/';
  const authorized = loaded && authValid;
  const showLoginBlock = !authorized && !isAuthPathname && !isRootPathname;
  const showProfileBlock = authorized && !!user && !isAuthPathname && !isRootPathname;

  return (
    <header className={styles.header}>
      <Logo />

      {!isAuthPathname && <NavBar />}

      <div className={styles.rightBlock}>
        {isAuthPathname && <BackLink />}

        {showLoginBlock && <LoginBlock />}

        {showProfileBlock && <ProfileBlock />}
      </div>
    </header>
  );
}

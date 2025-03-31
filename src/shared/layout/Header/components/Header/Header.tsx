// import cn from 'classnames'
import styles from './Header.module.scss';
import { Logo } from '../../../../components/Logo/Logo';
import { BackLink } from '../BackLink/BackLink';
import { NavBar } from '../../../NavBar';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
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


  const isRootPathname = useMemo(() => {
    return location.pathname === '/';
  }, [location.pathname])

  const authorized = useMemo(
    () => !isAuthPathname && loaded && !!user && authValid,
    [authValid, isAuthPathname, loaded, user],
  );

  const showLoginBlock = useMemo(
    () => loaded && !isAuthPathname && !authorized && !isRootPathname,
    [authorized, isAuthPathname, isRootPathname, loaded],
  );

  const showProfileBlock = useMemo(
    () => authValid && authorized && !isAuthPathname && !isRootPathname,
  [authValid, authorized, isAuthPathname, isRootPathname],
);

  useEffect(() => {
    console.log({
      authorized,
      showLoginBlock,
      showProfileBlock,
      isAuthPathname,
      loaded, 
      user: !!user,
      authValid,
    })
  }, [authValid, authorized, isAuthPathname, loaded, showLoginBlock, showProfileBlock, user])

  return (
    <header className={styles.header}>
      <Logo />

      {isAuthPathname && <BackLink />}

      {!isAuthPathname && <NavBar />}

      {showLoginBlock && <LoginBlock />}

      {showProfileBlock && <ProfileBlock />}

      {!loaded || isRootPathname && <div className={styles.empty}></div>}
    </header>
  );
}

// import cn from 'classnames'
import styles from './Header.module.scss';
import { Logo } from '../../../../components/Logo/Logo';
import { BackLink } from '../BackLink/BackLink';
import { NavBar } from '../../../NavBar';
import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export const Header: React.FC = () => {
  const location = useLocation();

  const navBarHidden = useCallback(() => {
    const hiddenLocations = [
      '/login',
      '/register',
    ]
  
    return hiddenLocations.includes(location.pathname);
  }, [location.pathname])

  return (
    <header className={styles.header}>
      <Logo />

      {!navBarHidden() && <NavBar />}

      <BackLink />
    </header>
  );
}

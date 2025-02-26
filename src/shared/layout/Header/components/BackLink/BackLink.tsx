import { Link, useLocation } from 'react-router-dom';
import styles from './BackLink.module.scss';
import back from '@assets/icons/back.svg';
import { useCallback } from 'react';

export const BackLink: React.FC = () => {

  const location = useLocation();

  // Fn retrieves previous pathname from saved location state
  // if none (link is copied outside), page will instead be routed to home
  const getReferreer = useCallback(() => {
    const historyState = location.state;

    if (historyState) {
      return historyState.from;
    }

    return '/';
  }, [location.state]);

  return (
    <Link 
      to={{
        pathname: getReferreer(),
        search: location.state?.search,
      }}
      className={styles.link}
    >
      <span className={styles.text}>Back</span>
      <div className={styles.icon}><img src={back} alt="arrow right icon" /></div>
    </Link>
  );
}

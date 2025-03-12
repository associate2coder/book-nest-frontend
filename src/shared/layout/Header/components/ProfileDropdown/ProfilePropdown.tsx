import cn from 'classnames'
import styles from './ProfileDropdown.module.scss';
import { Avatar } from '../Avatar';
import { useUser } from '../../../../hooks/useUser';
import settings from '@assets/icons/settings.svg';
import signout from '@assets/icons/signout.svg';
import { profileMenu as config } from '../../config/profileMenu';
import { Link } from 'react-router-dom';

export const ProfileDropdown: React.FC = () => {
  const user = useUser();

  const handleSignout = () => {
    console.log('Sign out to be implemented');
  }

  return (
    <div className={styles.profileDropdown}>
      <div className={cn(styles.section)}>
        <div className={styles.profileSection}>
          <Avatar />
          <h4 className={styles.userName}>{user?.fullName}</h4>
        </div>
        
        <div className="divider"></div>
      </div>


      <div className={cn(styles.section, styles.navSection)}>
        <Link
          to={`/${config.settings.path}`}
          state={{ from: location.pathname, search: location.search }}
          className={styles.dropdownItem}
        >
          <img src={settings} alt="settings icon" className={styles.icon} />
          <span className="button-text">{config.settings.title}</span>
        </Link>

        <div
          className={styles.dropdownItem}
          onClick={handleSignout}
        >
          <img src={signout} alt="sign out icon" className={styles.icon} />
          <span className="button-text">{config.signout.title}</span>
        </div>
      </div>
    </div>
  );
}

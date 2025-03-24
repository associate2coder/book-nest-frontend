import { Link } from 'react-router-dom';
import { links } from '../../config/links';
import styles from './FooterNav.module.scss';

export const FooterNav: React.FC = () => {
  return (
    <div className={styles.links}>
      <ul className={styles.list}>
      {links.map(link => (
        <li key={link.id} className={styles.listItem}>
          <Link
            to={link.path}
            target={link.newTab ? "_blank" : undefined }
            className={styles.link}
          >{link.title}</Link>
        </li>
      ))}

      </ul>
    </div>
  );
}
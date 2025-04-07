import cn from 'classnames'
import styles from './NavBar.module.scss';
import { navItems } from './config';
import { NavLink, NavLinkRenderProps, useLocation } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const location = useLocation();

  const getNavLinkClassNames = ({ isActive }: NavLinkRenderProps, path: string) => {
    return cn(styles.navLink, {
      [styles.navLinkActive]: isActive || path === 'home' && location.pathname === '/',
    })
  };

  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        {Object.values(navItems).map(page => (
          <li className={styles.navItem} key={page.id}>
            <NavLink 
              to={`/${page.path}`}
              state={{ from:location.pathname, search: location.search }}
              className={props => getNavLinkClassNames(props, page.path)}
            >
              {page.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

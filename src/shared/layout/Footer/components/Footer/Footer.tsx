import { Logo } from '../../../../components/Logo/Logo';
import { FooterNav } from '../FooterNav';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Logo />

      <FooterNav />

      <span className={styles.rights}>© 2025 All rights reserved</span>
    </footer>
  );
}
import google from '@assets/icons/google.svg';
import facebook from '@assets/icons/facebook.svg';
import styles from './SocialButton.module.scss';
import { capitalize } from '../../utils/helpers';
import { loginHandlers } from '../../../features/auth/socialLoginHandlers';

interface Props {
  type: 'google' | 'facebook';
  action: 'signup' | 'login'
}

export const SocialButton: React.FC<Props> = ({ type, action }) => {
  // select relevant social config
  const typeKey = type as keyof typeof loginHandlers;
  const social = loginHandlers[typeKey];

  // select proper link from social config
  const linkKey = action as keyof typeof social;
  const link = social[linkKey];

  const isGoogle = type === 'google';
  const icon = isGoogle ? google : facebook;

  const handleAuth = () => {
    window.location.href = link;
  }

  return (
    <button
      type="button" 
      className={styles.loginButton} 
      onClick={handleAuth}
    >
      <img src={icon} className={styles.button} alt={type.charAt(0).toUpperCase()}/>
      <span>{capitalize(type)}</span>
    </button>
  );
};

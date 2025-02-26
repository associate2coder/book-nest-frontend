import google from '@assets/icons/google.svg';
import facebook from '@assets/icons/facebook.svg';
import styles from './SocialButton.module.scss';
import { capitalize } from '../../utils/helpers';

interface Props {
  type: 'google' | 'facebook';
  action: 'signup' | 'login'
}

const googleRegisterLink = `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}` +
  `&redirect_uri=${import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI}`+
  `&response_type=code` +
  `&scope=openid email profile` +
  `&state=popup`;

const googleLoginLink = `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}` +
  `&redirect_uri=${import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI}`+
  `&response_type=code` +
  `&scope=openid email` +
  `&state=popup`;

const facebookRegisterLink = `https://www.facebook.com/v18.0/dialog/oauth?` +
  `client_id=${import.meta.env.VITE_FACEBOOK_CLIENT_ID}` +
  `&redirect_uri=${import.meta.env.VITE_FACEBOOK_AUTH_REDIRECT_URI}`;
  // `&scope=email,public_profile` +
  // `&response_type=code` +
  // `&state=popup`;

const facebookLoginLink = `https://www.facebook.com/v18.0/dialog/oauth?` +
  `client_id=${import.meta.env.VITE_FACEBOOK_CLIENT_ID}` +
  `&redirect_uri=${import.meta.env.VITE_FACEBOOK_AUTH_REDIRECT_URI}`;
  // `&scope=email` +
  // `&response_type=code` +
  // `&state=popup`;


const config = {
  google: {
    login: googleLoginLink,
    signup: googleRegisterLink
  },
  facebook: {
    login: facebookLoginLink,
    signup: facebookRegisterLink,
  },
}

export const SocialButton: React.FC<Props> = ({ type, action }) => {

  // const { setAuthToken } = useContext(AuthContext);

  // select relevant social config
  const typeKey = type as keyof typeof config;
  const social = config[typeKey];

  // select proper link from social config
  const linkKey = action as keyof typeof social;
  const link = social[linkKey];


  const handleAuth = () => {
    const popup = window.open(link, "auth", "width=500,height=600");

    if (!popup) {
      return;
    }

    popup.focus();
  }
    

  const isGoogle = type === 'google';
  // const isLogin = action === 'login';

  const icon = isGoogle ? google : facebook;

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

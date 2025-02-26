import { SocialButton } from '../SocialButton/SocialButton';
import styles from './SocialButtonBlock.module.scss';

type SocialAction = 'signup' | 'login';
 
interface Props {
  type: SocialAction;
}

export const SocialButtonBlock: React.FC<Props> = ({ type }) => {
  return (
    <div className={styles.socialButtons}>
      <SocialButton type="google" action={type} /> 

      <SocialButton type="facebook" action={type} /> 
    </div>
  );
}

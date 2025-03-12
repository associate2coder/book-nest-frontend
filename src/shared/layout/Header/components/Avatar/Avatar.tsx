import styles from './Avatar.module.scss';
import defaultAvatar from '@assets/images/avatar.png';

interface Props {
  image?: string;
}

export const Avatar: React.FC<Props> = ({ image }) => {
  const avatarImage = image ? image : defaultAvatar;

  return (
    <div className={styles.container}>
      <img src={avatarImage} alt="user avatart picture" className={styles.image} />
    </div>
  );
};
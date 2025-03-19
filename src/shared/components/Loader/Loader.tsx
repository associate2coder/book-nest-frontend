import cn from 'classnames';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  const number = [1, 2, 3, 4];
  return (
    <div className={cn(styles.newtonsCradle, styles.loaderOverlay)}>
      {number.map(num => (
        <div className={styles.newtonsCradleDot} key={num}></div>
      ))}
    </div>
  );
};
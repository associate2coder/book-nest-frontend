import cn from 'classnames'
import styles from './ProfileBlock.module.scss';
import { CartButton } from '../CartButton';
import expand from '@assets/icons/expand_inverted.svg';
import { useCallback, useState } from 'react';
import { ProfileDropdown } from '../ProfileDropdown';
import { Avatar } from '../Avatar';
import { CartMenu } from '../CartMenu/CatMenu';
import { useAppSelector } from '../../../../hooks/storeHooks';

export const ProfileBlock: React.FC = () => {
  const { loaded, user } = useAppSelector(state => state.profile);
  const [expanded, setExpanded] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);

  const toggleCartMenu = useCallback(() => {
    setCartOpened(prev => !prev);
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.profileBlock}>
        <CartButton onClick={toggleCartMenu} />
        
        {cartOpened && <CartMenu close={() => setCartOpened(false)} />}
        
        <div className={styles.dropdownButton}>
          <Avatar />

          <img src={expand} alt="expand icon" className={cn(styles.icon, {
            [styles.iconExpanded]: expanded,
          })} onClick={() => setExpanded(!expanded)} />
        </div>
      </div>

      {loaded && user && expanded && (
        <ProfileDropdown close={() => setExpanded(false)} user={user} />
      )}
    </div>
  );
}

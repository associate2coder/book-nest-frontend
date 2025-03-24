import styles from './ArrowButton.module.scss';
import arrowLeft from '@assets/icons/arrow-left.svg';
import arrowRight from '@assets/icons/arrow-right.svg';
import React from 'react';
import cn from 'classnames';

interface Props {
  configKey: string;
  action: () => void;
  disabled?: boolean;
}

const imgConfig = {
  arrowLeft: {
    icon: arrowLeft,
    alt: 'arrow left icon'
  },
  arrowRight: {
    icon: arrowRight,
    alt: 'arrow right icon'
  },}

export const ArrowButton: React.FC<Props> = React.memo(
({ configKey, action, disabled = false }) => {
    const img = imgConfig[configKey as keyof typeof imgConfig];

    return (
      <button className={cn(styles.roundButton, {
        [styles.disabled]: disabled,
      })} onClick={action}>
        <img src={img.icon} alt={img.alt} className={styles.icon} />
      </button>
    );
  }
);

ArrowButton.displayName = 'ArrowButton';
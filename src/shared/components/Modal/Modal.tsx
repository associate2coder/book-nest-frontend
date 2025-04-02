import React from 'react';
import styles from './Modal.module.scss';
import cn from 'classnames';

interface Props {
  overlay: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ overlay, children }) => {
  return (
    <div
      className={cn(styles.modal, {
        [styles.overlay]: overlay,
      })}
    >
      {children}
    </div>
  );
};

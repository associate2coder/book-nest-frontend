import React from 'react';
import styles from './Counter.module.scss';

interface Props {
  value: number;
}

export const Counter: React.FC<Props> = React.memo(
  ({ value }) => {

    return (
      <div className={styles.counter}>
        <span className={styles.value}>{value}</span>
      </div>
    );
  }
);

Counter.displayName = 'Counter';
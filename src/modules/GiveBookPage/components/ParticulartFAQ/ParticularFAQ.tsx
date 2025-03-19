import React from 'react';
import { FAQ } from '../../../../shared/types/FAQ';
import styles from './ParticularFAQ.module.scss';

interface Props {
  item: FAQ;
}

export const ParticularFAQ: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.particularFAQ}>
      <h4 className={styles.question}>{item.question}</h4>

      <p className={styles.answer}>{item.answer}</p>
    </div>
  );
};
import styles from './Step.module.scss';

interface Step {
  title: string;
  description: string;
}

interface Props {
  number: number;
  step: Step;
}

export const Step: React.FC<Props> = ({ number, step }) => {
  return (
    <div className={styles.step}>
      <div className={styles.number}>{number}</div>

      <div className={styles.content}>
        <p className={styles.title}>{step.title}</p>

        <p className={styles.description}>{step.description}</p>

      </div>
    </div>
  );
}
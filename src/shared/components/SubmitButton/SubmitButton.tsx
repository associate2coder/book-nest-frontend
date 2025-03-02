import styles from './SubmitButton.module.scss';

type ClickHandler = ((e: React.SyntheticEvent) => void) | ((...args: unknown[]) => void)

interface Props {
  text: string;
  onClick: ClickHandler;
}

export const SubmitButton: React.FC<Props> = ({
  text,
  onClick,
}) => {
  return (
    <button 
      className={styles.submitButton}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../SecondaryButton';
import styles from './ConfirmationMessage.module.scss';
import { textConfig } from './config';

interface Props {
  type: 'give' | 'order';
  reset?: () => void;
}

export const ConfirmationMessage: React.FC<Props> = ({ type, reset = () => {} }) => {
  const navigate = useNavigate();

  const handleGiveAnotherBtn = () => {
    setTimeout(() => reset(), 0);
    navigate('/give');
  }

  const giveBoook = type === 'give';
  const config = textConfig[type as keyof typeof textConfig];

  return (
    <>
      <div className={styles.messageBlock}>
        <h2 className={styles.title}>{config.title}</h2>

        <p className={styles.message}>{config.message}</p>
      </div>

      {config.notes && (
        <div className={styles.noteBlock}>
          {config.notes.map((note, i) => (
            <p className={styles.note} key={`note-${i}`}>{note}</p>
          ))}
        </div>
      )}

      {giveBoook && (
        <div className={styles.buttonBlock}>
          <SecondaryButton text={`Give another book`} onClick={handleGiveAnotherBtn} />
        </div>
      )}
    </>
  );
}
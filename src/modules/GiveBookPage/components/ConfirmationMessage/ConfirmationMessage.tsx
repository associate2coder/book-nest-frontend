import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../../../../shared/components/SecondaryButton';
import styles from './ConfirmationMessage.module.scss';

interface Props {
  reset: () => void;
}

export const ConfirmationMessage: React.FC<Props> = ({ reset }) => {
  const navigate = useNavigate();

  const handleGiveAnotherBtn = () => {
    setTimeout(() => reset(), 0);
    navigate('/give');
  }

  return (
    <>
      <div className={styles.messageBlock}>
        <h2 className={styles.title}>Thank You for Sharing Your Book!</h2>

        <p className={styles.message}>{
          `Your book submission has been received. ` +
          `Our team will review it shortly. ` +
          `Once approved, you’ll receive an email with further instructions, ` +
          `including a link to the shipping form for sending your book.`
          }</p>
      </div>

      <div className={styles.noteBlock}>
        <p className={styles.note}>* Review time: up to 24 hours</p>

        <p className={styles.note}>* Once approved, you’ll earn points for your donation!</p>
      </div>

      <div className={styles.buttonBlock}>
        <SecondaryButton text={`Give another book`} onClick={handleGiveAnotherBtn} />
      </div>
    </>
  );
}
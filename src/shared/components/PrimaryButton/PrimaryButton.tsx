import styles from './PrimaryButton.module.scss';
import cn from 'classnames';

interface Props {
  text: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  onClick?: (...args: unknown[]) => void;
  selected?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ text, type, onClick = () => {}, selected = false }) => {
  return (
    <button 
      className={cn(styles.button, {
        [styles.default]: !selected, 
        [styles.selected]: selected,
      })}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
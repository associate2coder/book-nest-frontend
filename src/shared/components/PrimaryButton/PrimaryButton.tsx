import styles from './PrimaryButton.module.scss';
import cn from 'classnames';

interface Props {
  text: string;
  onClick: (...args: unknown[]) => void;
  selected?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ text, onClick, selected = false }) => {
  return (
    <div 
      className={cn(styles.button, {
        [styles.default]: !selected, 
        [styles.selected]: selected,
      })}
      onClick={onClick}
    >
      {text}
    </div>
  )
}
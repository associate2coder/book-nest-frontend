import React from 'react';
import styles from './PrimaryButton.module.scss';
import cn from 'classnames';

interface Props {
  text: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  onClick?: (...args: unknown[]) => void;
  selected?: boolean;
  selectedText?: string;
}

export const PrimaryButton: React.FC<Props> = React.memo(
  ({ text, type, onClick = () => {}, selected = false, selectedText = '' }) => {
    const visibleText = selected ? selectedText : text;

    return (
      <button 
        className={cn(styles.button, {
          [styles.default]: !selected, 
          [styles.selected]: selected,
        })}
        type={type}
        onClick={onClick}
      >
        {visibleText}
      </button>
    )
  }
);

PrimaryButton.displayName = 'PrimaryButton';
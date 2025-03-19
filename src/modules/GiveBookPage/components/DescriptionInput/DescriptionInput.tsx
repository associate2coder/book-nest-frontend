import React from 'react';
import styles from './DescriptionInput.module.scss';
import cn from 'classnames';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const DescriptionInput: React.FC<Props> = React.memo(
  ({ value = '', onChange }) => {
    
    return (
      <div className={styles.textareaContainer}>
        <label htmlFor="description" 
          className={cn(styles.label, {
            [styles.visible]: value.length > 0,
          })}
      >
        Add short description to the book
      </label>

      <textarea 
        name="description" 
        id="description"
        placeholder="Add short description to the book"
        className={styles.descriptionInput}
        rows={4} 
        onChange={onChange}
      />
    </div>
  );
  }
);

DescriptionInput.displayName = 'DescriptionInput';
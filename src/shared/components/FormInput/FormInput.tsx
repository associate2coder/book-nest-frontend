
import React from 'react';
import { formInputConfig } from './config';
import styles from './FormInput.module.scss';
import cn from 'classnames';

interface Props {
  configKey: string;
  value: string;
  error: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordComment?: boolean;
}

export const FormInput: React.FC<Props> = React.memo(
  ({
    configKey,
    value,
    error,
    onChange,
    showPasswordComment = false,
  }) => {
    const config = formInputConfig[configKey as keyof typeof formInputConfig];

    return (
      <div className={styles.group}>
      <label 
        htmlFor={config.id} 
        className={cn(styles.label, {
          [styles.visible]: value.length > 0,
        })}
      >
        {config.label}
      </label>

      <input 
        id={config.id}
        {...(config.excluded ? {} : { name: config.id })}
        type={config.type}
        placeholder={config.placeholder}
        value={value}
        onChange={onChange}
        className={cn(styles.input, {
          [styles.error]: error,
        })}
      />
        <p className={cn(styles.message, {
          [styles.errorMessage]: error,
        })}>
          {showPasswordComment ? `Must be at least 8 characters` : error}
        </p> 
    </div>
    );
  }
);

FormInput.displayName = 'FormInput';

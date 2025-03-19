
import React, { useCallback, useRef, useState } from 'react';
import { formInputConfig } from './config';
import styles from './FormInput.module.scss';
import cn from 'classnames';
import showpassword from '@assets/icons/showpassword.svg';

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
    value = '',
    error,
    onChange,
    showPasswordComment = false,
  }) => {
    const [showPassword, setShowPassword] = useState(false);
    const config = formInputConfig[configKey as keyof typeof formInputConfig];
    const isPassword = config.type === 'password';
    const inputRef = useRef<HTMLInputElement>(null);

    const togglePassword = useCallback(() => {
      setShowPassword(!showPassword);
      inputRef.current?.focus();
    }, [showPassword]);

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
        type={isPassword && showPassword ? 'text' : config.type}
        placeholder={config.placeholder}
        value={value}
        onChange={onChange}
        ref={inputRef}
        className={cn(styles.input, {
          [styles.error]: error,
          [styles.password]: isPassword,
        })}
      />

      {isPassword && (
        <img 
          src={showpassword} 
          alt="show password" 
          className={cn(styles.icon, styles.showPassword)}
          onClick={togglePassword}
        />
      )}

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

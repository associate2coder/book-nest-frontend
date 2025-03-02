// import cn from 'classnames'
import styles from './SignUpForm.module.scss';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FormSeparator } from '../../../../shared/components/FormSeparator/FormSeparator';
import { FormInput } from '../../../../shared/components/FormInput';
import { validateEmail, validateFullName, validatePassword } from '../../utils/validation';
import { Link } from 'react-router-dom';
import { MIN_PASS_LENGTH } from '../../../../config/constants';
import { SubmitButton } from '../../../../shared/components/SubmitButton';
import { authService } from '../../../../features/auth/authService';
import { AuthContext } from '../../../../features/auth/AuthContext';
import { SocialButtonBlock } from '../../../../shared/components/SocialButtonBlock';

interface SignUpState {
  fullName: string;
  fullNameError: string;
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  repeatPassword: string;
  repeatPasswordError: string;
}

const initialSignUpState: SignUpState = {
  fullName: '',
  fullNameError: '',
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  repeatPassword: '',
  repeatPasswordError: '',
}

export const SingUpForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpState>(initialSignUpState);
  const { setAuthToken } = useContext(AuthContext); 

  // update input value on change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const key = target.id;
    const value = target.value;
    const error = `${key}Error`;

    const isPassword = key === 'password'
    const passwordError = value.length < MIN_PASS_LENGTH
      ? `Must be at least ${MIN_PASS_LENGTH} characters`
      : '';
    const errorValue = isPassword ? passwordError : '';

    setFormData(prevState => {
      return { ...prevState, [key]: value, [error]: errorValue };
    })
  }, [])

  // set repeat password error if passwords do not match
  useEffect(() => {
    if (formData.password !== formData.repeatPassword) {
      setFormData(prevState => ({
        ...prevState,
        repeatPasswordError: `Passwords don't match`,
      }))
    }
  }, [formData.password, formData.repeatPassword])

  // Submit registration form to the server
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    const newErrors: Partial<SignUpState> = {};

    // validate email
    const email = formData.email.trim();
    const emailValidation = validateEmail(email);

    if (!emailValidation.validated) {
      newErrors.emailError = emailValidation.message;
      hasError = true;
    }

    // validate email
    const password = formData.email.trim();
    const passwordValidation = validatePassword(password);

    if (!passwordValidation.validated) {
      newErrors.passwordError = passwordValidation.message;
      hasError = true;
    }

    // Full name validation
    const fullName = formData.fullName.trim();
    const lastNameValidation = validateFullName(fullName);

    if (!lastNameValidation.validated) {
      newErrors.fullNameError = lastNameValidation.message;
      hasError = true;
    }
  
    // If there are errors, form updated with errors
    if (hasError) {
      setFormData(prevState => ({ ...prevState, ...newErrors }));
      return;
    }

    // prepare registration request
    const registrationRequest = authService.createRegistrationRequest(
      formData.email,
      formData.password,
      formData.password,
    );

    // send registration request
    authService.register(registrationRequest)
      .then(res => {
        const loginRequest = authService.createLoginRequest(
          res.email,
          formData.password,
        )

        // once registered, sign in
        authService.login(loginRequest)
          .then(tokenRes => {
            setAuthToken(tokenRes.token);
          })
      })
  
    // Reset form after successful submission
    setFormData(initialSignUpState);
  }, [formData.email, formData.fullName, formData.password, setAuthToken]);

  return (
    <form 
      action="post" 
      className={styles.form} 
      onSubmit={handleSubmit}
    >
      <div className={styles.nameField}>
        <FormInput 
          configKey="fullName"
          value={formData.fullName}
          error={formData.fullNameError}
          onChange={handleInputChange}
        />
      </div>

      <FormInput 
        configKey="email"
        value={formData.email}
        error={formData.emailError}
        onChange={handleInputChange}
      />

      <FormInput 
        configKey="password"
        value={formData.password}
        error={formData.passwordError}
        onChange={handleInputChange}
        showPasswordComment={true}
      />

      <FormInput 
        configKey="repeatPassword"
        value={formData.repeatPassword}
        error={formData.repeatPasswordError}
        onChange={handleInputChange}
      />

      <FormSeparator />

      <SocialButtonBlock type="signup" />

      <SubmitButton 
        text="Create account"
        onClick={handleSubmit}
      />

      <div className={styles.loginBlock}>
        <span>Already have an account?</span>

        <Link to="/login" className={styles.loginLink}>Log in</Link>
      </div>

    </form>
  );
}
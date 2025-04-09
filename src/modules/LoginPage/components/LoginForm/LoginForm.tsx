// import cn from 'classnames'
import styles from './LoginForm.module.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { FormSeparator } from '../../../../shared/components/FormSeparator/FormSeparator';
import { FormInput } from '../../../../shared/components/FormInput';
import { authService } from '../../../../features/auth/authService';
import { SocialButtonBlock } from '../../../../shared/components/SocialButtonBlock';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SubmitButton } from '../../../../shared/components/SubmitButton';
import { useAppDispatch } from '../../../../shared/hooks/storeHooks';
import { getUser } from '../../../../services/userService';
import { setUser } from '../../../../store/profileSlice';
import { BASED_AUTHORISED_ROUTE } from '../../../../config/constants';

interface LoginState {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
}

const initialLoginState: LoginState = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
}

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginState>(initialLoginState);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('LOGIN mounted');
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const key = target.name;
    const value = target.value;
    const error = `${key}Error`;

    setFormData(prevState => {
      return { ...prevState, [key]: value, [error]: '' };
    })
  }, [])

  const getTargetRoute = useCallback(() => {

    const target = location.state?.to ?? BASED_AUTHORISED_ROUTE;

    console.log('TARGET', target);

    return target;
  }, [location.state?.to]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const email = formData.email;
    const password = formData.password;
    const requestData = { email, password };

    authService.login(requestData)
      .then(() => {
        getUser()
          .then(usr => {
            dispatch(setUser(usr));
          });

        setTimeout(() => navigate(getTargetRoute()), 0);
      })
      .catch(err => {
        console.log(err);
      })
  }, [dispatch, formData.email, formData.password, getTargetRoute, navigate]);

  return (
    <form 
      action="post" 
      className={styles.form} 
      onSubmit={handleSubmit}
    >
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
      />

      <FormSeparator />

      <SocialButtonBlock type="login" />

     <SubmitButton 
        text="Log in"
        onClick={handleSubmit}
      />

      <div className={styles.registerBlock}>
        <span>Don't have an account yet?</span>

        <Link to="/register" className={styles.registerLink}>Create account</Link>
      </div>

    </form>
  );
}
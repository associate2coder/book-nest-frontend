// import cn from 'classnames'
// import styles from './HomePage.module.scss';

import { Link } from "react-router-dom";
import { useAuth } from "../../features/hooks/useAuth";

export const HomePage: React.FC = () => {
  const { authToken } = useAuth();

  return (
    <div>
      <h1>{`[Home Page]`}</h1>
      <Link to={'register'}>Sign up</Link>
      <br />
      <Link to={'login'}>Log in</Link>
      <br />
      <p>{authToken}</p>
    </div>
  );
}
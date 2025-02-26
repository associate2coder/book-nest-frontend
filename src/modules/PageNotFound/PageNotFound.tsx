// import cn from 'classnames'
// import styles from './PageNotFound.module.scss';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PageNotFound: React.FC = () => {

  const navigate = useNavigate();
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 3000)
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
    }
  })

  return (
    <div>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>{`You will be redirected in ${timer}`}</p>
    </div>
  );
}
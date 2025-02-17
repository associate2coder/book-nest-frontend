import { useEffect, useState } from 'react';
import constructionImage from '../src/assets/under-construction.svg';
import './App.scss';

interface TestType {
  message: string;
}

export const App: React.FC = () => {
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    fetch('https://book-nest-proxy.olatsko.workers.dev/api/health', { method: 'GET' })
      .then(res => {
        console.log(res);
        
        if (!res.ok) {
          throw new Error('Request' + res.status);
        }

        return res.json();
      })
      .then((data: TestType) => {
        console.log(data);

        setTestMessage(data.message);
      })
      .catch(err => {
        setTestMessage(`Error: ${err}`);
      })
  }, []);

  return (
    <div className="App">

      <div className="under-construction-container">
        <h1>{testMessage}</h1>

        <img src={constructionImage} alt="page under construction image" />

        <p className="under-construction-message">This page is under construction</p>
      </div>
    </div>
  );
}
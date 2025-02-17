import { useEffect, useState } from 'react';
import constructionImage from '../src/assets/under-construction.svg';
import './App.scss';

// const TEST_URL = 'http://ec2-3-84-50-78.compute-1.amazonaws.com:8080/health';


export const App: React.FC = () => {
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    fetch('/api/health', { method: 'GET' })
      .then(res => {
        console.log(res);
        
        if (!res.ok) {
          throw new Error('Request' + res.status);
        }

        return res.text();
      })
      .then(data => {
        console.log(data);

        setTestMessage(data);
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
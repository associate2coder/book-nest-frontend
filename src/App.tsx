import constructionImage from '../src/assets/under-construction.svg';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="App">

      <div className="under-construction-container">
        <h1>BookNest</h1>
        <img src={constructionImage} alt="page under construction image" />
        <p className="under-construction-message">This page is under construction</p>
      </div>
    </div>
  );
}
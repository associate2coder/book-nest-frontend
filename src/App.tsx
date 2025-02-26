import { Header } from './shared/layout/Header/components/Header';
import { Outlet } from 'react-router-dom';
import './App.scss';

export const App: React.FC = () => {

  return (
    <div className="App">
      <Header />

      <main className="App__main">
        <Outlet />
      </main>
    </div>
  );
}
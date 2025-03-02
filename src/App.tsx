import { Header } from './shared/layout/Header/components/Header';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { useAppDispatch } from './shared/hooks/storeHooks';
import { initBooks } from './store/bookSlice';
import { useEffect } from 'react';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();


  // fetch books on page load
  useEffect(() => {
    dispatch(initBooks());
  }, [dispatch])

  return (
    <div className="App">
      <Header />

      <main className="App__main">
        <Outlet />
      </main>
    </div>
  );
}
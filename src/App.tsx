import { Header } from './shared/layout/Header/components/Header';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { useEffect } from 'react';
import { useUser } from './shared/hooks/useUser';
import { useAppDispatch } from './shared/hooks/storeHooks';
import { initGenres } from './store/filtersSlice';
import { initFavs } from './store/favSlice';
import { initCart } from './store/cartSlice';
import { Footer } from './shared/layout/Footer/components/Footer';
import { initBooks } from './store/bookSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // fetch books on page load
  useEffect(() => {
    dispatch(initBooks());
  }, [dispatch])

  // fetch books on page load
  useEffect(() => {
    dispatch(initGenres());
  }, [dispatch])

  // check authentication when page is loaded
  useUser();

  // init favourites from server
  useEffect(() => {
    dispatch(initFavs());
  }, [dispatch]);

  // init favourites from server
  useEffect(() => {
    dispatch(initCart());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      <main className="App__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
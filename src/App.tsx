import { Header } from './shared/layout/Header/components/Header';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { useEffect } from 'react';
import { useAppSelector } from './shared/hooks/storeHooks';
import { localStorageKeys } from './config/constants';
import { useUser } from './shared/hooks/useUser';
import { useAppDispatch } from './shared/hooks/storeHooks';
import { initGenres } from './store/genreSlice';
// import { initBooks } from './store/bookSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const favItems = useAppSelector(state => state.fav);
  const cartItems = useAppSelector(state => state.cart);


  // fetch books on page load
  // useEffect(() => {
  //   dispatch(initBooks());
  // }, [dispatch])

  // fetch books on page load
  useEffect(() => {
    dispatch(initGenres());
  }, [dispatch])

  // check authentication when page is loaded
  useUser();

  // save favourites to localStorage for it to survive reload
  useEffect(() => {
    localStorage.setItem(localStorageKeys.favourites, JSON.stringify(favItems));
  }, [favItems]);

  // save cart to localStorage for it to survive reload
  useEffect(() => {
    localStorage.setItem(localStorageKeys.cart, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="App">
      <Header />

      <main className="App__main">
        <Outlet />
      </main>
    </div>
  );
}
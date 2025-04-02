import { Header } from './shared/layout/Header/components/Header';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './shared/hooks/storeHooks';
import { initGenres } from './store/filtersSlice';
import { initFavs } from './store/favSlice';
import { initCart } from './store/cartSlice';
import { Footer } from './shared/layout/Footer/components/Footer';
import { initBooks, initRecommended } from './store/bookSlice';
import { fetchUser, initDonated, initTaken } from './store/profileSlice';
import { useAuth } from './features/hooks/useAuth';
import { AddToCartConfirmation } from './shared/components/AddToCartConfirmation';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loaded, user } = useAppSelector(state => state.profile);
  const authorised = useAuth();

  // fetch books on page load
  useEffect(() => {
    dispatch(initBooks());
  }, [dispatch])

  // fetch books on page load
  useEffect(() => {
    dispatch(initGenres());
  }, [dispatch])

  // init books for slider from server
  useEffect(() => {
    dispatch(initRecommended());
  }, [dispatch]);

  // init favourites from server
  useEffect(() => {
    if (authorised) {
      dispatch(initFavs());
    }
  }, [authorised, dispatch]);

  // init favourites from server
  useEffect(() => {
    if (authorised) {
      dispatch(initCart());
    }
  }, [authorised, dispatch]);

  // init user from server
  useEffect(() => {
    if (authorised && !user) {
      dispatch(fetchUser());
    }
  }, [authorised, dispatch, user]);

  // init user books
  useEffect(() => {
    if (!authorised || !user || !loaded) {
      return;
    }

    dispatch(initDonated());
    dispatch(initTaken());
  }, [authorised, dispatch, loaded, user]);

  return (
    <div className="App">
      <Header />

      <main className="App__main">
        <AddToCartConfirmation />

        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
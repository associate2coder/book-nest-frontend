import { Header } from './shared/layout/Header/components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './shared/hooks/storeHooks';
import { initGenres } from './store/filtersSlice';
import { initFavs } from './store/favSlice';
import { initCart } from './store/cartSlice';
import { Footer } from './shared/layout/Footer/components/Footer';
import { initBooks, initRecommended } from './store/bookSlice';
import { fetchUser, initDonated, initTaken, setUser } from './store/profileSlice';
import { useAuth } from './features/hooks/useAuth';
import { AddToCartConfirmation } from './shared/components/AddToCartConfirmation';
import { checkAuth } from './store/authSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loaded, user } = useAppSelector(state => state.profile);
  const authorised = useAuth();
  const location = useLocation();

  // update auth status on each change of location
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, location.pathname]);

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
    dispatch(initRecommended(authorised));
  }, [authorised, dispatch]);

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

    if (!authorised && user) {
      dispatch(setUser(null));
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
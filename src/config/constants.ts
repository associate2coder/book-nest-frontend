import { User } from '../shared/types/User';

export const TESTING = false;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const REDIRECT_LINK = `${import.meta.env.VITE_HOST}/redirect`;

export const MIN_PASS_LENGTH = 8;

export const DEFAULT_SORTBY = 'age-desc';
export const BOOKS_PER_PAGE = 6;

export const testUser: User = {
  id: 1,
  email: 'GilbertLola@gmail.com',
  fullName: 'Lola Gilbert',
  tokens: 5,
};

export const localStorageKeys = {
  cart: 'cart',
  favourites: 'favourites',
}
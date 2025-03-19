import { REDIRECT_LINK } from "../../config/constants";

const googleRegisterLink = `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}` +
  `&redirect_uri=${import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI}`+
  `&response_type=code` +
  `&scope=openid email profile` +
  `&state=${REDIRECT_LINK}`;

const googleLoginLink = `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}` +
  `&redirect_uri=${import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI}`+
  `&response_type=code` +
  `&scope=openid email profile` + 
  `&state=${REDIRECT_LINK}`;

const facebookRegisterLink = `https://www.facebook.com/v18.0/dialog/oauth?` +
  `client_id=${import.meta.env.VITE_FACEBOOK_CLIENT_ID}` +
  `&redirect_uri=${import.meta.env.VITE_FACEBOOK_AUTH_REDIRECT_URI}`;

const facebookLoginLink = `https://www.facebook.com/v18.0/dialog/oauth?` +
  `client_id=${import.meta.env.VITE_FACEBOOK_CLIENT_ID}` +
  `&redirect_uri=${import.meta.env.VITE_FACEBOOK_AUTH_REDIRECT_URI}`;

export const loginHandlers = {
  google: {
    login: googleLoginLink,
    signup: googleRegisterLink
  },
  facebook: {
    login: facebookLoginLink,
    signup: facebookRegisterLink,
  },
}
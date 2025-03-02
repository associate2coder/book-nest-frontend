import { createContext } from "react";
import { AuthState } from "./types/AuthState";

export const initialAuthState: AuthState = {
  authToken: '',
  setAuthToken: () => {},
  loading: false,
}

export const AuthContext = createContext<AuthState>(initialAuthState);

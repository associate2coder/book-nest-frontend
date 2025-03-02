export interface AuthState {
  authToken: string;
  setAuthToken: (token: string) => void;
  loading: boolean;
}
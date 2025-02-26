import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AUTH_TOKEN_KEY } from "../../config/constants";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Fetch user on mount
  useEffect(() => {
    setLoading(true);

    const token = sessionStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      setAuthToken(token);
    }

    setLoading(false);
  }, []);

  // save token to sesstionStorage
  useEffect(() => {
    sessionStorage.setItem(AUTH_TOKEN_KEY, authToken);
  }, [authToken]) 

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, loading }}>
        {children}
    </AuthContext.Provider>
  );
}

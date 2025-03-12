import { useState } from "react";
import { AuthContext } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string>('');
  const [loading] = useState(false);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, loading }}>
        {children}
    </AuthContext.Provider>
  );
}

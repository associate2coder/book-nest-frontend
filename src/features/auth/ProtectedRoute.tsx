import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const { authToken, loading } = useAuth();

    if (loading) {
      return <p>Loading...</p>
    }

    console.log('authToken', authToken);
    

    // TODO need to check whether authToken is still valid
    if (!authToken || authToken.length === 0) {
      return <Navigate 
        to="/login" 
        replace={true} 
        state={{ from: location.pathname, search: location.search }}
      />
    }

    return children ? <>{children}</> : <Outlet />;
}
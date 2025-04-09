import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const authorised = useAuth();

    // console.log('user', user);

    if (!authorised) {
      return <Navigate 
        to="/login" 
        replace={true} 
        state={{ from: location.pathname, search: location.search }}
      />
    }

    return children ? <>{children}</> : <Outlet />;
}
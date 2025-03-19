import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useUser } from "../../shared/hooks/useUser";

interface Props {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const user = useUser();

    console.log('user', user);

    if (!user) {
      return <Navigate 
        to="/login" 
        replace={true} 
        state={{ from: location.pathname, search: location.search }}
      />
    }

    return children ? <>{children}</> : <Outlet />;
}
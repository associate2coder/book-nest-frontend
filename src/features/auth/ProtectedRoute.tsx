import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { BASED_AUTHORISED_ROUTE } from "../../config/constants";

interface Props {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const authorised = useAuth();
  const location = useLocation();


    if (!authorised) {
      return <Navigate 
        to="/login" 
        replace={true} 
        state={{ 
          to: location.pathname,
          toSearch: location.search,
          from: location.state?.from ?? BASED_AUTHORISED_ROUTE, 
          search: location.state?.search ?? '',
        }}
      />
    }

    return children ? <>{children}</> : <Outlet />;
}
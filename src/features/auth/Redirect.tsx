import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../../shared/components/Loader";

export const Redirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authorised = useAuth();

  // Fn retrieves previous pathname from saved location state
  // if none (link is copied outside), page will instead be routed to home
  // const getReferreer = useCallback(() => {
  //   const historyState = location.state;

  //   if (historyState) {
  //     return historyState.from;
  //   }

  //   return '/';
  // }, [location.state]);
  const historyState = location.state as { from?: string };
  const redirectTo = historyState?.from || "/"; // Default to home if no state


  useEffect(() => {
    navigate(redirectTo, { replace: true });
  }, [navigate, redirectTo, authorised]);

  return <Loader />;
}

import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Redirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fn retrieves previous pathname from saved location state
  // if none (link is copied outside), page will instead be routed to home
  const getReferreer = useCallback(() => {
    const historyState = location.state;

    if (historyState) {
      return historyState.from;
    }

    return '/';
  }, [location.state]);

  useEffect(() => {
    navigate(getReferreer());
  }, []);

  return <p>Please wait</p>;
}

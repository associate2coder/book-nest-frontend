import { useEffect, useMemo } from "react";
import { User } from "../types/User"
import { userService } from "../../services/userService";
import { TESTING, testUser } from "../../config/constants";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { setUser } from "../../store/profileSlice";
import { useAuth } from "../../features/hooks/useAuth";

const authPathname = [
  '/login',
  '/register',
];

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { loaded, user } = useAppSelector(state => state.profile);
  const authorised = useAuth();
  
  // const [user, setUser] = useState<User | null>(null);
  // const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  const isAuthPathname = useMemo(() => {
    return authPathname.includes(location.pathname) ||
      location.pathname === '';
  }, [location.pathname])

  // update user only if smth changed
  const updateUser = (usr: User) => {
      dispatch(setUser(usr));
  }

  useEffect(() => {
    if (isAuthPathname) {
      return;
    }

    if (authorised) {
      return;
    }

    userService.getUser()
      .then(updateUser)
      .catch(err => {
        console.log(err);

        if (TESTING) {
          setUser(testUser);
        }

        dispatch(setUser(null));
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return { user, loaded };
}
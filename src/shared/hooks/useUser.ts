import { useEffect, useMemo, useState } from "react";
import { User } from "../types/User"
import { userService } from "../../services/userService";
import { TESTING, testUser } from "../../config/constants";
import { useLocation } from "react-router-dom";

const authPathname = [
  '/login',
  '/register',
];

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  const location = useLocation();

  const isAuthPathname = useMemo(() => {
    return authPathname.includes(location.pathname) ||
      location.pathname === '';
  }, [location.pathname])

  // update user only if smth changed
  const updateUser = (usr: User) => {
    if (JSON.stringify(usr) !== JSON.stringify(user)) {
      setUser(usr);
      
      console.log(usr);
    }
  }

  useEffect(() => {
    if (isAuthPathname) {
      return;
    }

    setLoaded(false);

    userService.getUser()
      .then(updateUser)
      .catch(err => {
        console.log(err);

        if (TESTING) {
          setUser(testUser);
        }
      })
      .finally(() => setLoaded(true))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthPathname])

  return { user, loaded };
}
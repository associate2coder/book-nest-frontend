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
  const location = useLocation();

  const isAuthPathname = useMemo(() => {
    return authPathname.includes(location.pathname) ||
      location.pathname === '';
  }, [location.pathname])

  useEffect(() => {
    if (isAuthPathname) {
      return;
    }

    userService.getUser()
      .then(setUser)
      .catch(err => {
        console.log(err);

        if (TESTING) {
          setUser(testUser);
        }
      })
  }, [isAuthPathname])

  return user;
}
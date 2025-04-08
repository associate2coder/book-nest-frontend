// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../shared/hooks/storeHooks";
// import { authService } from "../auth/authService";
// import { getUser } from "../../services/userService";
// import { setUser } from "../../store/profileSlice";

import { useAppSelector } from "../../shared/hooks/storeHooks"

// export const useAuth = () => {
//   const { loaded, user } = useAppSelector(state => state.profile);
//   const [authorised, setAuthorised] = useState(authService.validate());
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const authValid = authService.validate();

//     setAuthorised(authValid);

//     if (authValid && !user) {
//       getUser()
//         .then(usr => {
//           dispatch(setUser(usr));
//         });
//     }
//   }, [dispatch, loaded, user])

//   return authorised;
// };

export const useAuth = () => {
  return useAppSelector(state => state.auth);
}

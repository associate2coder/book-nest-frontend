import { User } from "../shared/types/User"
import { apiClient } from "./apiClient"

export const getUser = () => {
  return apiClient.get<User>('/users/me');
}

export const userService = {
  getUser,
}
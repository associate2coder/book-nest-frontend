import { apiClient } from "../../services/apiClient";
import { LoginRequest } from "./types/LoginRequest";
import { RegistrationRequest } from "./types/RegistrationRequst";
import { TokenResponse } from "./types/TokenResponse";
import { User } from "./types/User";


const createRegistrationRequest: (
  email: string,
  password: string,
  fullName: string,
) => RegistrationRequest = (email, password, fullName) => {
  return { email, password, fullName };
}

const register = (data: RegistrationRequest) => {
  return apiClient.post<User>('/auth/registration', data);
};

const createLoginRequest: (
  email: string,
  password: string,
) => LoginRequest = (email, password) => {
  return { email, password };
}

const login = (data: LoginRequest) => {
  return apiClient.post<TokenResponse>('/auth/login', data);
};

export const authService = {
  createRegistrationRequest,
  createLoginRequest,
  register,
  login,
}
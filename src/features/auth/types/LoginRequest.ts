import { RegistrationRequest } from "./RegistrationRequst";

export type LoginRequest = Pick<RegistrationRequest, 'email' | 'password'>;

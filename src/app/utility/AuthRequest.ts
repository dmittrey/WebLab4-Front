import {AuthStatus} from "../auth/AuthStatus";

export interface AuthRequest {
  typeOfAuth: AuthStatus;
  username: string;
  password: string;
}

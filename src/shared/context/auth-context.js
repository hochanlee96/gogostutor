import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  email: null,
  verified: false,
  approval: "",
  accessToken: null,
  refreshToken: null,
  login: () => {},
  logout: () => {},
  verifyRefreshToken: () => {},
  verifyUser: () => {},
  setApprovalStatus: () => {},
  socket: null,
});

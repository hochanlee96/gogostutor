import { createContext } from "react";

export const ProfileContext = createContext({
  userData: null,
  verifyUser: () => {},
  setApprovalStatus: () => {},
  setProfileData: () => {},
  getProfileData: () => {},
});

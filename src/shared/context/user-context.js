import { createContext } from "react";

export const UserContext = createContext({
  data: null,
  profile: null,
  setApprovalStatus: () => {},
  setProfileData: () => {},
  getProfileData: () => {},
});

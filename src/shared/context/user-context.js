import { createContext } from "react";

export const UserContext = createContext({
  data: null,
  setApprovalStatus: () => {},
  setProfileData: () => {},
  getProfileData: () => {},
});

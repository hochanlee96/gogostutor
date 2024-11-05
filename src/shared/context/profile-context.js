import { createContext } from "react";

export const ProfileContext = createContext({
  profileData: null,
  setProfileData: () => {},
  getProfileData: () => {},
});

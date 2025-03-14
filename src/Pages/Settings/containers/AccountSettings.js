import { useState, useContext } from "react";
import { SettingData } from "./SettingData.js";

import { AuthContext } from "../../../shared/context/auth-context";
import { UserContext } from "../../../shared/context/user-context.js";

import Account from "../components/Account";
import CalendarPref from "../components/CalendarPref";
import LoginMethod from "../components/LoginMethod";
import Notifications from "../components/Notifications";
import Payout from "../components/Payout";
import Profile from "../components/Profile";
import ClassProfile from "../components/ClassProfile";
import GeneralSettings from "../components/GeneralSettings.js";

import defaultProfileImage from "../../../shared/assets/icons/user.png";
import classes from "./AccountSettings.module.css";

const AccountSettings = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const profile =
    user && user.profile
      ? user.profile
      : { profile: { firstName: "", lastName: "" } };

  const settingData = [...SettingData];
  const contentMap = {
    "Tutor Profile": <Profile />,
    "Class Profile": <ClassProfile />,
    Account: <Account />,
    "Login Method": <LoginMethod />,
    Notifications: <Notifications />,
    Settings: <GeneralSettings />,
    "Calendar Sync Preferences": <CalendarPref />,
    "Payout Settings": <Payout />,
  };
  const [showing, setShowing] = useState("Tutor Profile");

  return (
    <div className={classes.Container}>
      <div className={classes.TabContent}>
        <div className={classes.profileBox}>
          {profile.imageURL ? (
            <img
              src={profile.imageURL}
              alt="Profile"
              className={classes.profileImage}
            />
          ) : (
            <img
              src={defaultProfileImage}
              alt="Profile"
              className={classes.profileImage}
            />
          )}
          <div className={classes.profileInfo}>
            <h3 className={classes.profileName}>
              {profile.firstName}

              {/* <span className={classes.profileRole}>Tutor</span> */}
            </h3>
          </div>
        </div>
        <div className={classes.SettingBox}>
          {settingData
            ? settingData.map((data) => {
                return (
                  <div
                    key={data.title}
                    onClick={() => {
                      setShowing(data.title);
                    }}
                    className={
                      showing === data.title ? classes.TabSelected : null
                    }
                  >
                    {data.title}
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className={classes.ContentContainer}>{contentMap[showing]}</div>
    </div>
  );
};

export default AccountSettings;

import { useState } from "react";
import { SettingData1, SettingData2 } from "../../containers/SettingData.js";

import Account from "../components/Account";
import CalendarPref from "../components/CalendarPref";
import LoginMethod from "../components/LoginMethod";
import Notifications from "../components/Notifications";
import Payout from "../components/Payout";
import Profile from "../components/Profile";
import Settings from "../components/Settings";

import defaultProfileImage from "../../../../shared/assets/icons/user.png";
import classes from "./AccountSettings.module.css";

const AccountSettings = () => {
  const settingData = [...SettingData1, ...SettingData2];
  const contentMap = {
    "Tutor Profile": <Profile />,
    Account: <Account />,
    "Login Method": <LoginMethod />,
    Settings: <Settings />,
    Notifications: <Notifications />,
    "Calendar Sync Preferences": <CalendarPref />,
    "Payout Settings": <Payout />,
  };
  const [showing, setShowing] = useState("Tutor Profile");

  return (
    <div className={classes.Container}>
      <div className={classes.TabContent}>
        <div className={classes.profileBox}>
          <img
            src={defaultProfileImage}
            alt="Profile"
            className={classes.profileImage}
          />
          <div className={classes.profileInfo}>
            <h3 className={classes.profileName}>
              Tyler <span className={classes.profileRole}>Tutor</span>
            </h3>
            <button className={classes.switchButton}>Switch Account</button>
          </div>
        </div>
        <div className={classes.SettingBox}>
          {settingData
            ? settingData.map((data) => {
                console.log("showing: ", showing);
                console.log("current rendered: ", data.title);
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

import React, { useState } from "react";
import classes from "./GeneralSettings.module.css";

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    language: "tyler1004@gmail.com",
    location: "*******",
    timezone: "010-0000-0000",
    desktopNotification: true,
    studyBuddies: true,
    showStudyBuddyRequests: true,
  });

  const toggleCheckbox = (key) => {
    setSettings((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Your General Setting</h1>

      <div className={classes.row}>
        <div className={classes.section}>
          <label className={classes.label}>Language</label>
          <div className={classes.inlineInput}>
            <input
              type="text"
              value={settings.language}
              className={classes.input}
              readOnly
            />
            <button className={classes.button}>Update</button>
          </div>
        </div>

        <div className={classes.section}>
          <label className={classes.label}>Current Location</label>
          <div className={classes.inlineInput}>
            <input
              type="text"
              value={settings.location}
              className={classes.input}
              readOnly
            />
            <button className={classes.button}>Update</button>
          </div>
        </div>

        <div className={classes.section}>
          <label className={classes.label}>Current Location Timezone</label>
          <div className={classes.inlineInput}>
            <input
              type="text"
              value={settings.timezone}
              className={classes.input}
              readOnly
            />
            <button className={classes.button}>Update</button>
          </div>
        </div>
      </div>

      <div className={classes.checkboxSection}>
        <div className={classes.checkboxItem}>
          <input
            type="checkbox"
            checked={settings.desktopNotification}
            onChange={() => toggleCheckbox("desktopNotification")}
            className={classes.checkbox}
          />
          <label className={classes.checkboxLabel}>Desktop Notification</label>
        </div>

        <div className={classes.checkboxItem}>
          <input
            type="checkbox"
            checked={settings.studyBuddies}
            onChange={() => toggleCheckbox("studyBuddies")}
            className={classes.checkbox}
          />
          <label className={classes.checkboxLabel}>
            Study Buddies
            <span className={classes.checkboxDescription}>
              Save students you would like to study with again. Turn this off if
              you don’t want other students to save you as a study buddy.{" "}
              <a href="#" className={classes.link}>
                View Detail &gt;
              </a>
            </span>
          </label>
        </div>

        <div className={classes.checkboxItem}>
          <input
            type="checkbox"
            checked={settings.showStudyBuddyRequests}
            onChange={() => toggleCheckbox("showStudyBuddyRequests")}
            className={classes.checkbox}
          />
          <label className={classes.checkboxLabel}>
            Show Study Buddy Requests
            <span className={classes.checkboxDescription}>
              See when someone saves you as a study buddy.
            </span>
          </label>
        </div>
      </div>

      <button className={classes.saveButton}>Save all changes</button>
    </div>
  );
};

export default GeneralSettings;

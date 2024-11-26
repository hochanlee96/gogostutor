import React, { useState } from "react";
import classes from "./CalendarPref.module.css";

const CalendarPref = () => {
  const [calendars, setCalendars] = useState([
    {
      id: 1,
      name: "Google Calendar",
      description:
        "To see your Gogos Edu schedule appear in your Google Calendar, you will need to authorize access via Google.",
      synced: false,
    },
    {
      id: 2,
      name: "Apple Calendar",
      description:
        "To see your Gogos Edu schedule appear in your Apple Calendar, you will need to authorize access via Apple.",
      synced: false,
    },
    {
      id: 3,
      name: "Samsung Calendar",
      description:
        "To see your Gogos Edu schedule appear in your Samsung Calendar, you will need to authorize access via Samsung.",
      synced: false,
    },
    {
      id: 4,
      name: "Microsoft Calendar",
      description:
        "To see your Gogos Edu schedule appear in your Microsoft Calendar, you will need to authorize access via Microsoft.",
      synced: false,
    },
  ]);

  const toggleSync = (id) => {
    setCalendars((prevState) =>
      prevState.map((calendar) =>
        calendar.id === id
          ? { ...calendar, synced: !calendar.synced }
          : calendar
      )
    );
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Your Calendar Sync</h1>

      {calendars.map((calendar) => (
        <div key={calendar.id} className={classes.calendarItem}>
          <div className={classes.calendarHeader}>
            <label className={classes.checkboxContainer}>
              <input
                type="checkbox"
                checked={calendar.synced}
                onChange={() => toggleSync(calendar.id)}
                className={classes.checkbox}
              />
              <span className={classes.checkboxLabel}>
                Automatically sync with {calendar.name}
              </span>
            </label>
          </div>
          <p className={classes.description}>{calendar.description}</p>
          <button className={classes.button}>
            {calendar.synced ? "Reauthorize access" : "Authorize access"}
          </button>
        </div>
      ))}

      <button className={classes.saveButton}>Save all changes</button>
    </div>
  );
};

export default CalendarPref;

import React from "react";

import classes from "./Test.module.css";

const WeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 49 }, (_, n) => {
  const mod = n % 2;
  const i = (n - mod) / 2;

  return mod
    ? ""
    : i === 0
    ? ""
    : i === 24
    ? `${12} am`
    : i === 12
    ? `${12} pm`
    : i > 11
    ? `${i - 12} pm`
    : `${i} am`;
});

const data = [];

const Test = () => {
  return (
    <div className={classes.container}>
      <div className={classes.timetable}>
        <div style={{ gridColumn: 1, gridRow: 1 }}></div>
        {WeekDays.map((day) => (
          <div key={day} className={classes.cell}>
            <div>{day}</div>
          </div>
        ))}
        {hours.map((hour, index) => (
          <div
            style={{
              gridColumn: 0,
              gridRow: index + 2,
            }}
          >
            {hour}
          </div>
        ))}
        <div
          style={{
            gridColumn: 4,
            gridRow: "40 / span 4",

            // gridRow: `span 4`,

            backgroundColor: "green",
            zIndex: 1,
          }}
        >
          Test
        </div>
      </div>
    </div>
  );
};

export default Test;

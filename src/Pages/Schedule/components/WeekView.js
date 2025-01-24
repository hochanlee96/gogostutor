import React, { useState } from "react";

import classes from "./WeekView.module.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = Array.from({ length: 50 }, (_, n) => {
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

const WeekView = ({ focusedDay, setFocusedDay }) => {
  const [currentDay, setCurrentDay] = useState(new Date());
  //   const [focusedDay, setFocusedDay] = useState(new Date());

  const formatWeekString = (today) => {
    const startDay = new Date(today);
    startDay.setDate(startDay.getDate() - startDay.getDay());
    const startDayString =
      startDay.getFullYear() +
      " " +
      new Intl.DateTimeFormat("en-US", { month: "long" }).format(startDay) +
      " " +
      startDay.getDate();
    console.log("ss: ", startDayString);

    const endDay = new Date(startDay);
    endDay.setDate(endDay.getDate() + 6);
    const endDayString =
      endDay.getFullYear() +
      " " +
      new Intl.DateTimeFormat("en-US", { month: "long" }).format(endDay) +
      " " +
      endDay.getDate();
    console.log("ee: ", endDayString);
    console.log(startDayString + " - " + endDayString.split(" ")[2]);

    if (startDay.getFullYear() !== endDay.getFullYear()) {
      return startDayString + " - " + endDayString;
    } else if (startDay.getMonth() !== endDay.getMonth()) {
      return (
        startDayString + " - " + endDayString.split(" ").slice(1).join(" ")
      );
    } else {
      return startDayString + " - " + endDayString.split(" ")[2];
    }
  };

  const moveWeek = (direction) => {
    if (direction === "prev") {
      const startDay = focusedDay;
      startDay.setDate(startDay.getDate() - focusedDay.getDay());
      const prevDay = startDay.setDate(startDay.getDate() - 7);
      setFocusedDay(new Date(prevDay));
    } else if (direction === "next") {
      const startDay = focusedDay;
      startDay.setDate(startDay.getDate() - focusedDay.getDay());
      const prevDay = startDay.setDate(startDay.getDate() + 7);
      setFocusedDay(new Date(prevDay));
    }
  };

  return (
    <div className={classes.Container}>
      <div className={classes.WeekInfoBox}>
        <div>{formatWeekString(focusedDay)}</div>
        <button onClick={() => moveWeek("prev")}>prev</button>
        <button
          onClick={() => {
            setFocusedDay(currentDay);
          }}
        >
          today
        </button>
        <button onClick={() => moveWeek("next")}>next</button>
      </div>
      <div className={classes.headerTimetable}>
        {/* Row 0: Empty corner cell */}
        <div className={` ${classes.emptyCell} `}></div>

        {/* Row 0: Day headers */}
        {days.map((day, index) => {
          const currentDate = new Date(focusedDay);
          console.log("FF: ", focusedDay);
          currentDate.setDate(
            currentDate.getDate() - currentDate.getDay() + index
          );
          return (
            <div key={day} className={`${classes.dateCell} ${classes.header}`}>
              <div className={classes.dateHeader}>
                <div>{currentDate.getDate()}</div>
                <div>{day}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.tableContainer}>
        <div className={classes.timetable}>
          {/* Hour headers and timetable cells */}
          {hours.map((hour, index) => {
            const mod = index % 2;

            return (
              <React.Fragment key={hour}>
                {/* Hour row header */}
                <div className={`${classes.hourCell} ${classes.hourHeader}`}>
                  <div className={classes.hourText}>{hour}</div>
                </div>

                {/* Cells for each day */}
                {days.map((day) => {
                  const items = [{ day: "Tue", startHour: 5, duration: 4 }];
                  const nullList = [
                    { day: "Tue", startHour: 6 },
                    { day: "Tue", startHour: 7 },
                    { day: "Tue", startHour: 8 },
                  ];
                  const nullItem = nullList.find(
                    (item) => item.day === day && item.startHour === index
                  );

                  const item = items.find(
                    (i) => i.day === day && i.startHour === index
                  );

                  return item ? (
                    <div
                      key={`${hour}-${day}`}
                      className={`${classes.cell} ${classes.spanned}`}
                      style={{ gridRow: `span ${item.duration}` }}
                    >
                      {item.label}
                    </div>
                  ) : nullItem ? null : (
                    <div
                      key={`${hour}-${day}`}
                      className={`${classes.cell} ${
                        !mod ? "" : classes.borderTop
                      }`}
                    >
                      {/* Content goes here */}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;

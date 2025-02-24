import React, { useState } from "react";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import classes from "./WeekViewDisplay.module.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const hours = Array.from({ length: 48 }, (_, n) => {
//   const mod = n % 2;
//   const i = (n - mod) / 2;

//   return mod
//     ? ""
//     : i === 0
//     ? ""
//     : i === 24
//     ? `${12} am`
//     : i === 12
//     ? `${12} pm`
//     : i > 11
//     ? `${i - 11} pm`
//     : `${i} am`;
// });
// console.log("hours: ", hours);
const hours = [
  "",
  "1 am",
  "",
  "2 am",
  "",
  "3 am",
  "",
  "4 am",
  "",
  "5 am",
  "",
  "6 am",
  "",
  "7 am",
  "",
  "8 am",
  "",
  "9 am",
  "",
  "10 am",
  "",
  "11 am",
  "",
  "12 pm",
  "",
  "1 pm",
  "",
  "2 pm",
  "",
  "3 pm",
  "",
  "4 pm",
  "",
  "5 pm",
  "",
  "6 pm",
  "",
  "7 pm",
  "",
  "8 pm",
  "",
  "9 pm",
  "",
  "10 pm",
  "",
  "11 pm",
  "",
  "12 am",
];

const emptySlots = Array.from({ length: 48 * 7 }, (_, i) => i);

const WeekView = ({
  focusedDay,
  setFocusedDay,
  availabilityList,
  setAvailabilityList,
  sessionSlotList,
  mergedSessionSlotList,
}) => {
  const [currentDay, setCurrentDay] = useState(new Date());
  //   const [focusedDay, setFocusedDay] = useState(new Date());
  const [selectedList, setSelectedList] = useState([]);

  const formatWeekString = (today) => {
    const startDay = new Date(today);
    startDay.setDate(startDay.getDate() - startDay.getDay());
    const startDayString =
      startDay.getFullYear() +
      " " +
      new Intl.DateTimeFormat("en-US", { month: "long" }).format(startDay) +
      " " +
      startDay.getDate();

    const endDay = new Date(startDay);
    endDay.setDate(endDay.getDate() + 6);
    const endDayString =
      endDay.getFullYear() +
      " " +
      new Intl.DateTimeFormat("en-US", { month: "long" }).format(endDay) +
      " " +
      endDay.getDate();

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
        <div className={classes.DateString}>{formatWeekString(focusedDay)}</div>
        <div className={classes.moveButtonBox}>
          <button
            onClick={() => moveWeek("prev")}
            className={classes.moveButton}
          >
            <FaChevronLeft />
          </button>
          <button
            className={`${classes.moveButton} ${classes.moveButtonToday}`}
            onClick={() => {
              setFocusedDay(new Date());
            }}
          >
            Today
          </button>
          <button
            onClick={() => moveWeek("next")}
            className={classes.moveButton}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className={classes.headerTimetable}>
        {/* Row 0: Empty corner cell */}
        <div
          className={` ${classes.emptyCell} `}
          style={{ gridRow: 1, gridColumn: 1 }}
        ></div>

        {/* Row 0: Day headers */}
        {days.map((day, index) => {
          const currentDate = new Date(focusedDay);

          currentDate.setDate(
            currentDate.getDate() - currentDate.getDay() + index
          );
          return (
            <div
              key={day}
              className={`${classes.dateCell} ${classes.header}`}
              style={{ gridRow: 1, gridColumn: index + 2 }}
            >
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
            return (
              <React.Fragment key={`row-${index}`}>
                {/* Hour row header */}
                <div
                  className={`${classes.hourCell} ${classes.hourHeader}`}
                  style={{ gridColumn: 1, gridRow: index + 1 }}
                >
                  <div className={classes.hourText}>{hour}</div>
                </div>
              </React.Fragment>
            );
          })}
          {emptySlots.map((slot, index) => {
            const day = index % 7;
            const column = day + 2;
            const row = (index - day) / 7 + 1;
            const odd = row % 2;
            return (
              <div
                key={`empty-${index}`}
                style={{
                  gridColumn: column,
                  gridRow: row,
                  border: "1px solid #ddd",
                  zIndex: "0",
                }}
              ></div>
            );
          })}
          {availabilityList.map((slot, index) => {
            return slot.status === "taken" ? (
              <div
                key={`slot-${index}`}
                style={{
                  gridRow: slot.row,
                  gridColumn: slot.column,
                  zIndex: "2",
                }}
                className={classes.timeslotTaken}
              ></div>
            ) : (
              <div
                key={`slot-${index}`}
                style={{
                  gridRow: slot.row,
                  gridColumn: slot.column,
                  zIndex: "2",
                }}
                className={classes.timeslot}
              ></div>
            );
          })}
          {/* <div
            style={{
              gridRow: "23 / span 4",
              gridColumn: 4,
              backgroundColor: "green",
              zIndex: "1",
            }}
          ></div> */}
          {mergedSessionSlotList.map((slot, index) => {
            return (
              <div
                key={`${slot.groupId}-${index}`}
                className={classes.sessionslot}
                style={{
                  gridRow: `${slot.startingRow} / span ${slot.count}`,
                  gridColumn: slot.column,
                  zIndex: "1",
                }}
              >
                <div
                  className={`${
                    slot.status === "open"
                      ? classes.sessionslotIndex
                      : classes.sessionslotIndexTaken
                  }`}
                ></div>
                <div className={classes.sessionslotText}>{slot.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;

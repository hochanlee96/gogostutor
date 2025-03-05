import React, { useState } from "react";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import classes from "./WeekViewDisplay.module.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

const formatStringSize = (string, size) => {
  if (string.length > size) {
    return string.slice(0, size) + "...";
  } else {
    return string;
  }
};

const filterTimeslots = (data, focusedDay) => {
  const startOfWeek = new Date(
    focusedDay.getFullYear(),
    focusedDay.getMonth(),
    focusedDay.getDate(),
    0,
    0,
    0
  );
  startOfWeek.setDate(focusedDay.getDate() - focusedDay.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);
  const filteredData = data.filter((item) => {
    const itemStartTime = new Date(item.startTime);
    return startOfWeek <= itemStartTime && itemStartTime <= endOfWeek;
  });

  return filteredData;
};

const generateTimeslots = (filteredData) => {
  const slotList = [];

  filteredData.forEach((item) => {
    const utcDate = new Date(item.startTime);

    // Convert the UTC date to the local timezone
    const localDate = new Date(
      utcDate.toLocaleString("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    );

    // Get the hour and minute in local time
    const localHour = localDate.getHours();
    const localMinute = localDate.getMinutes();
    const localDay = localDate.getDay();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Calculate the slot number (each slot is 30 minutes)
    const timeslot = localHour * 2 + Math.floor(localMinute / 30) + 1;

    const newItem = {
      ...item,
      timeslot,
      day: days[localDay],
      column: localDay + 2,
      row: timeslot,
      gridIndex: 7 * (timeslot - 1) + localDay,
      timeIndex: 48 * localDay + timeslot - 1,
    };
    slotList.push(newItem);
  });

  console.log("slot list: ", slotList);
  return slotList;
};

const compareSubjectList = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false; // Different lengths, not identical

  // Convert arrays into sorted lists of values based on the field
  const sorted1 = arr1.map((obj) => obj._id).sort();
  const sorted2 = arr2.map((obj) => obj._id).sort();

  // Compare sorted arrays
  return sorted1.every((value, index) => value === sorted2[index]);
};

const mergeSlotList = (slotList) => {
  const sortedList = slotList.sort((a, b) => a.timeIndex - b.timeIndex);
  const split = [];

  let currentStatus = "";
  let currentIndex = -1;
  let currentColumn = 1;
  let currentSubjects = [];
  let currentStudent = "";

  for (let timeslot of sortedList) {
    if (
      currentStatus !== timeslot.status ||
      currentColumn !== timeslot.column ||
      timeslot.timeIndex - currentIndex !== 1 ||
      !compareSubjectList(currentSubjects, timeslot.subjectList)
    ) {
      split.push({ ...timeslot, new: true });
    } else {
      split.push({ ...timeslot, new: false });
    }
    currentStatus = timeslot.status;
    currentIndex = timeslot.timeIndex;
    currentColumn = timeslot.column;
    currentSubjects = timeslot.subjectList;
  }

  const clustered = [];
  let cluster = [];
  for (let slot of split) {
    if (slot.new) {
      if (cluster.length === 0) {
        cluster.push(slot);
      } else {
        clustered.push(cluster);
        cluster = [slot];
      }
    } else {
      cluster.push(slot);
    }
  }
  if (cluster.length > 0) {
    clustered.push(cluster);
  }

  const result = [];
  for (let cluster of clustered) {
    const mainObj = { ...cluster[0] };
    mainObj.duration = cluster.length;
    result.push(mainObj);
  }

  return result;
};

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
    return startDayString + " - " + endDayString.split(" ").slice(1).join(" ");
  } else {
    return startDayString + " - " + endDayString.split(" ")[2];
  }
};

const WeekView = ({ focusedDay, setFocusedDay, processedTimeslots }) => {
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

          {mergeSlotList(processedTimeslots).map((slot, index) => {
            return (
              <div
                key={`${slot._id}`}
                className={classes.sessionslot}
                style={{
                  gridRow: `${slot.row} / span ${slot.duration}`,
                  gridColumn: slot.column,
                  zIndex: "1",
                  borderBottom: "1px solid #ddd",
                  borderTop: "1px solid #ddd",
                }}
                onClick={() => {
                  console.log("slot: ", slot);
                }}
              >
                <div
                  className={`${
                    slot.status === "open"
                      ? classes.sessionslotIndex
                      : classes.sessionslotIndexTaken
                  }`}
                  style={
                    slot.status === "open"
                      ? { backgroundColor: `${slot.subjectList[0].color}` }
                      : null
                  }
                ></div>
                <div className={classes.sessionslotText}>
                  <div
                    style={{ fontWeight: "600", fontSize: "13px" }}
                  >{`${formatStringSize(slot.subjectList[0].title, 20)}`}</div>
                  <div style={{ fontWeight: "400", fontSize: "12px" }}>
                    {`${
                      slot.subjectList.length > 1
                        ? slot.subjectList.length > 2
                          ? `+${slot.subjectList.length - 1} subjects`
                          : `+1 subject`
                        : ""
                    }`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;

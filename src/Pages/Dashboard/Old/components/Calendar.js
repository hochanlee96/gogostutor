import React, { useState, useEffect, useCallback, useContext } from "react";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

import { AuthContext } from "../../../../shared/context/auth-context";
import { API_GetTutorSessions, API_DeleteTutorSessions } from "../../../../API";

import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import moment from "moment";
import classes from "./Calendar.module.css";

const isSameWeek = (day, focusedDay) => {
  const weekStart = startOfWeek(focusedDay, { weekStartsOn: 0 }); // Sunday start
  const weekEnd = endOfWeek(focusedDay, { weekStartsOn: 0 });

  return isWithinInterval(day, { start: weekStart, end: weekEnd });
};

const inCurrentLocalDate = (date, startTime) => {
  const startDate = new Date(date);
  const endDate = new Date(
    new Date(startDate).setDate(startDate.getDate() + 1)
  );
  return startDate <= new Date(startTime) && new Date(startTime) < endDate;
};

const CalendarView = ({ focusedDay, setFocusedDay, data }) => {
  const monthData = data || {};
  return (
    <div>
      <Calendar
        onChange={setFocusedDay}
        value={focusedDay}
        locale="en-US"
        tileClassName={({ date }) => {
          if (isSameWeek(date, focusedDay)) {
            return classes.currentWeek;
          }
        }}
        // tileContent={({ date, view }) => {
        //   if (
        //     monthData.find((item) => inCurrentLocalDate(date, item.startTime))
        //   ) {
        //     return (
        //       <>
        //         <div className="flex justify-center items-center absoluteDiv">
        //           <div className={classes.Dot}></div>
        //         </div>
        //       </>
        //     );
        //   }
        // }}
      />
    </div>
  );
};

export default CalendarView;

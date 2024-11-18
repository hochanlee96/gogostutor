import React, { useState, useEffect, useCallback, useContext } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import { API_GetTutorSessions, API_DeleteTutorSessions } from "../../../API";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import classes from "./Calendar.module.css";
import { Session } from "./Session.js";

const CalendarView = () => {
  const [value, onChange] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [currentDaySessions, setCurrentDaySessions] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);

  const auth = useContext(AuthContext);

  const getTutorSessions = useCallback(async () => {
    try {
      setIsLoadingSessions(true);
      const response = await API_GetTutorSessions(auth.id, auth.accessToken);
      const data = await response.json();
      console.log("tutor sessions: ", data);
      if (data.status === 200) {
        setSessionList(data.sessionList);
        console.log("data: ", data);
      } else if (data.status === 401) {
        auth.verifyRefreshToken();
      }
    } catch (err) {
      console.log(err);
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      getTutorSessions();
      setIsLoadingSessions(false);
    }
  }, [getTutorSessions, auth]);
  useEffect(() => {
    if (sessionList && sessionList.length > 0) {
      setCurrentDaySessions(
        sessionList.filter((x) => {
          const offset = Math.floor(
            (new Date(x.startTime) - value) / (1000 * 60)
          );
          if (offset >= 0 && offset < 60 * 24) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [value, sessionList, isLoadingSessions]);

  const sessionDeleteHandler = async (sessionId) => {
    const response = await API_DeleteTutorSessions(
      auth.id,
      sessionId,
      auth.accessToken
    );
    const data = await response.json();
    console.log(data);
    window.location.reload();
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={({ date, view }) => {
          if (
            sessionList &&
            sessionList.length > 0 &&
            sessionList.find(
              (x) =>
                moment(new Date(x.startTime.split("T")[0])).format(
                  "YYYY-MM-DD"
                ) === moment(date).format("YYYY-MM-DD")
            )
          ) {
            return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  <div className={classes.Dot}></div>
                </div>
              </>
            );
          }
        }}
      />
      <div>Selected date: {value.toString()}</div>
      <div>
        {currentDaySessions ? (
          <div>
            {currentDaySessions.length} session
            {currentDaySessions.length > 0 ? "s" : ""} in selected date:
            {currentDaySessions.map((session) => {
              console.log(session);
              return (
                <Session
                  key={session._id}
                  sessionId={session._id}
                  startTime={session.startTime}
                  status={session.status}
                  sessionDeleteHandler={sessionDeleteHandler}
                  subject={session.subjectId}
                  studentId={session.studentId || ""}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CalendarView;

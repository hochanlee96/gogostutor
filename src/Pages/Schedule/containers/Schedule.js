import { useState, useEffect, useCallback, useContext } from "react";

import { EditSession } from "../components/Session.js";
import CalendarView from "../components/Calendar.js";
import WeekView from "../components/WeekView.js";
import AvailabilityFormBox from "../components/AvailabilityFormBox.js";
import { AuthContext } from "../../../shared/context/auth-context.js";

import classees from "./Schedule.module.css";

import { API_GetTutorSubjects, API_AddNewSession } from "../../../API";

const Schedule = () => {
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  const [isLoadingSubjectList, setIsLoadingSubjectList] = useState(true);
  const [focusedDay, setFocusedDay] = useState(new Date());
  const [availabilityList, setAvailabilityList] = useState([]);
  const auth = useContext(AuthContext);

  const generateTimeSlots = (data) => {
    const slotList = [];

    data.forEach((item) => {
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

      const newItem = { ...item, timeslot, day: days[localDay] };
      slotList.push(newItem);
    });

    return slotList;

    // const groupedById = data.reduce((acc, item) => {
    //   const { groupId } = item;

    //   const utcDate = new Date(item.startTime);

    //   // Convert the UTC date to the local timezone
    //   const localDate = new Date(
    //     utcDate.toLocaleString("en-US", {
    //       timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    //     })
    //   );

    //   // Get the hour and minute in local time
    //   const localHour = localDate.getHours();
    //   const localMinute = localDate.getMinutes();
    //   const localDay = localDate.getDay();

    //   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    //   // Calculate the slot number (each slot is 30 minutes)
    //   const timeslot = localHour * 2 + Math.floor(localMinute / 30);

    //   const newItem = { ...item, timeslot, day: days[localDay] };
    //   if (!acc[groupId]) {
    //     acc[groupId] = []; // Initialize an empty array for this id
    //   }
    //   acc[groupId].push(newItem); // Push the current object into the array
    //   return acc;
    // }, {});
    // return groupedById;
  };

  const fetchAvailability = useCallback(async () => {
    try {
      const startTime = new Date(
        focusedDay.getFullYear(),
        focusedDay.getMonth(),
        focusedDay.getDate() - focusedDay.getDay(),
        0,
        0,
        0
      );
      const endTime = new Date(
        new Date(startTime).setDate(startTime.getDate() + 8)
      );
      console.log(`startTime: ${startTime} endTime: ${endTime}`);
      const queryString = `startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`;
      console.log(`queryString: ${queryString}`);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          `/tutors/${auth.id}/availabilities?${queryString}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      const array = generateTimeSlots(data.data);
      setAvailabilityList(array);
    } catch (error) {
      console.log(error);
    }
  }, [focusedDay, auth.accessToken, auth.id]);

  const sessionSaveHandler = async (sessionForm) => {
    const startTime = new Date(
      sessionForm["year"],
      sessionForm["month"] - 1,
      sessionForm["day"],
      sessionForm["start"],
      0,
      0
    );
    setIsAddingSession(false);
    const response = await API_AddNewSession(
      auth.id,
      {
        startTime: startTime,
        subjectId: sessionForm.subjectId,
      },
      auth.accessToken
    );
    const data = await response.json();
    console.log(data);
    window.location.reload();
  };

  const getTutorSubjects = useCallback(async () => {
    const response = await API_GetTutorSubjects(auth.id, auth.accessToken);

    const data = await response.json();

    setSubjectList(data.subjectList);
  }, [auth]);

  useEffect(() => {
    if (auth) {
      getTutorSubjects();

      setIsLoadingSubjectList(false);
    }
  }, [auth, getTutorSubjects, isLoadingSubjectList]);

  useEffect(() => {
    if (auth.id && auth.accessToken && focusedDay) {
      fetchAvailability();
    }
  }, [auth.id, auth.accessToken, focusedDay, fetchAvailability]);

  return (
    <div className={classees.Container}>
      <div className={classees.SidebarContainer}>Sidebar</div>
      <div className={classees.WeekViewContainer}>
        <AvailabilityFormBox />
        <WeekView
          focusedDay={focusedDay}
          setFocusedDay={setFocusedDay}
          availabilityList={availabilityList}
          setAvailabilityList={setAvailabilityList}
        />
      </div>
      <div className={classees.MonthViewContainer}>
        <h3>Set availability for next month</h3>
        {isLoadingSubjectList ? (
          <div>Loading...</div>
        ) : subjectList && subjectList.length > 0 ? (
          isAddingSession ? (
            <EditSession
              saveHandler={sessionSaveHandler}
              year={new Date().getFullYear()}
              month={new Date().getMonth() + 1}
              date={new Date().getDate()}
              subjectList={subjectList}
            />
          ) : (
            <button
              onClick={() => {
                setIsAddingSession(true);
              }}
            >
              Open a session
            </button>
          )
        ) : (
          <div>You should apply for a subject to teach first!</div>
        )}
        <CalendarView focusedDay={focusedDay} setFocusedDay={setFocusedDay} />
      </div>
    </div>
  );
};

export default Schedule;

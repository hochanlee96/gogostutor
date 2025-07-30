import { useState, useEffect, useCallback, useContext } from "react";

import Sidebar from "../../../shared/components/Sidebar/Sidebar.js";

import { EditSession } from "../components/Session.js";
import CalendarView from "../components/Calendar.js";
import WeekViewDisplay from "../components/WeekViewDisplay.js";
import WeekViewEdit from "../components/WeekViewEdit.js";
// import AvailabilityFormBox from "../components/AvailabilityFormBox.js";
import { AuthContext } from "../../../shared/context/auth-context.js";

import classes from "./Schedule.module.css";

import { AiFillFire } from "react-icons/ai";
import { API_GetTutorSubjects, API_AddNewSession } from "../../../API";

const generateTimeslotMap = (data) => {
  const emptySlots = Array.from({ length: 48 * 7 }, (_, i) => i);
  const timeslotMap = emptySlots.reduce((acc, _, index) => {
    acc[index] = { status: "none" };
    return acc;
  }, {});
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
    const timeslot = localHour * 2 + Math.floor(localMinute / 30);

    const currentIndex = timeslot * 7 + localDay;
    timeslotMap[currentIndex]["status"] = "registered";
    timeslotMap[currentIndex]["item"] = { ...item };
  });
  return timeslotMap;
};

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

    const newItem = {
      ...item,
      timeslot,
      day: days[localDay],
      column: localDay + 2,
      row: timeslot,
    };
    slotList.push(newItem);
  });

  return slotList;
};

const mergeTimeslots = (timeslots) => {
  const columnObj = {};
  const result = [];
  for (let i = 0; i < timeslots.length; i++) {
    const currentColumn = timeslots[i].column;
    if (columnObj[currentColumn]) {
      const currentMin = columnObj[currentColumn].minrow;
      columnObj[currentColumn].minrow =
        currentMin > timeslots[i].row ? timeslots[i].row : currentMin;
      columnObj[currentColumn].count++;
    } else {
      columnObj[currentColumn] = {
        minrow: timeslots[i].row,
        count: 1,
        subject: timeslots[i].subjectList[0],
      };
    }
  }

  for (let key in columnObj) {
    result.push({
      column: key,
      row: columnObj[key].minrow,
      span: columnObj[key].count,
      subject: { ...columnObj[key].subject },
    });
  }
  return result;
};

const generateSessions = (data) => {
  const sessionObj = {};
  let result = [];
  for (let i = 0; i < data.length; i++) {
    const groupId = data[i].groupId;
    if (sessionObj[groupId]) {
      sessionObj[groupId].push(data[i]);
    } else {
      sessionObj[groupId] = [data[i]];
    }
  }

  for (let key in sessionObj) {
    const sessionGroup = mergeTimeslots(sessionObj[key]);

    result = result.concat(sessionGroup);
  }

  return result;
};

const mergeIntoClusters = (objects) => {
  // Sort the array to ensure row order
  const sortedObjects = [...objects].sort(
    (a, b) =>
      a.groupId - b.groupId ||
      a.status.localeCompare(b.status) ||
      a.column - b.column ||
      a.row - b.row
  );

  const clusters = [];

  for (let obj of sortedObjects) {
    // Check if we can merge with the last cluster
    let lastCluster = clusters[clusters.length - 1];

    if (
      lastCluster &&
      lastCluster.groupId === obj.groupId &&
      lastCluster.status === obj.status &&
      lastCluster.column === obj.column &&
      obj.row === lastCluster.startingRow + lastCluster.count // Ensuring consecutive row index
    ) {
      // Extend the existing cluster
      lastCluster.count += 1;
      lastCluster.originalObjects.push(obj);
    } else {
      // Start a new cluster
      clusters.push({
        groupId: obj.groupId,
        status: obj.status,
        column: obj.column,
        startingRow: obj.row,
        count: 1,
        title: obj.subjectList[0].title,
        originalObjects: [obj],
      });
    }
  }

  return clusters;
};

const getMonthRange = (focusedDay) => {
  const monthStart = new Date(focusedDay);
  monthStart.setDate(1);
  monthStart.setDate(monthStart.getDate() - monthStart.getDay());

  // console.log("fd: ", focusedDay);
  const monthEnd = new Date(focusedDay);

  const currentMonth = monthEnd.getMonth();
  monthEnd.setDate(1);
  monthEnd.setMonth(currentMonth + 1);
  monthEnd.setDate(0);
  monthEnd.setDate(monthEnd.getDate() - monthEnd.getDay() + 7);

  return { monthStart, monthEnd };
};
// const getWeekStartDates = (monthRange) => {
//   const result = {};
//   const monthStart = monthRange.monthStart;
//   const current = new Date(monthStart);
//   const monthEnd = monthRange.monthEnd;
//   while (current.toString() !== monthEnd.toString()) {
//     result[current.toString()] = [];
//     current.setDate(current.getDate() + 7);
//   }
//   return result;
// };

const filterTimeslots = (data, focusedDay) => {
  const startOfWeek = new Date(
    focusedDay.getFullYear(),
    focusedDay.getMonth(),
    focusedDay.getDate() - focusedDay.getDay(),
    0,
    0,
    0
  );

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);
  const filteredData = data.filter((item) => {
    const itemStartTime = new Date(item.startTime);

    return startOfWeek <= itemStartTime && itemStartTime < endOfWeek;
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

  // console.log("slot list: ", slotList);
  return slotList;
};

const Schedule = () => {
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0
  );
  // const [isAddingSession, setIsAddingSession] = useState(false);
  const [isManagingTimeSlots, setManagingTimeSlots] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  const [isLoadingSubjectList, setIsLoadingSubjectList] = useState(true);
  const [focusedDay, setFocusedDay] = useState(today);
  const [monthRange, setMonthRange] = useState(getMonthRange(today));
  const [startOfWeek, setStartOfWeek] = useState(
    new Date(
      new Date(today).setDate(today.getDate() - today.getDay())
    ).toString()
  );
  const [processedTimeslots, setProcessedTimeslots] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [timeslotMap, setTimeslotMap] = useState({});

  const [monthData, setMonthData] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const currentStartOfWeek = new Date(
      new Date(focusedDay).setDate(focusedDay.getDate() - focusedDay.getDay())
    );
    // if (currentStartOfWeek.toString() !== startOfWeek) {
    setStartOfWeek(currentStartOfWeek.toString());
    setProcessedTimeslots(
      generateTimeslots(filterTimeslots(monthData, focusedDay))
    );
    // }
  }, [focusedDay, startOfWeek, monthData]);

  useEffect(() => {
    const currentRange = getMonthRange(focusedDay);

    if (
      currentRange.monthStart.toString() !== monthRange.monthStart.toString() ||
      currentRange.monthEnd.toString() !== monthRange.monthEnd.toString()
    ) {
      setMonthRange(currentRange);
    }
  }, [focusedDay, monthRange]);

  const fetchTimeslotData = useCallback(
    async (monthRange) => {
      try {
        const queryString = `startTime=${monthRange.monthStart.toISOString()}&endTime=${monthRange.monthEnd.toISOString()}`;
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL +
            `/tutors/${auth.id}/timeslots?${queryString}`,
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
        setMonthData(data.data);
      } catch (error) {
        console.log(error);
      }
    },
    [auth]
  );

  useEffect(() => {
    fetchTimeslotData(monthRange);
  }, [monthRange, fetchTimeslotData]);

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
      // console.log(`startTime: ${startTime} endTime: ${endTime}`);
      const queryString = `startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`;
      // console.log(`queryString: ${queryString}`);
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
      // console.log("timeslot raw data: ", data);
      const array = generateTimeSlots(data.data);
      const sessionSlots = generateSessions(array);
      const merged = mergeIntoClusters(array);
      const timeslotMap = generateTimeslotMap(array);
      // console.log("session slots: ", sessionSlots);
      // console.log("session slots new: ", merged);
      // console.log("timeslot processed data", array);
      // setAvailabilityList(array);
      // setSessionSlotList(sessionSlots);
      // setMergedSessionSlotList(merged);
      setTimeslotMap(timeslotMap);
    } catch (error) {
      console.log(error);
    }
  }, [focusedDay, auth.accessToken, auth.id]);

  // const sessionSaveHandler = async (sessionForm) => {
  //   const startTime = new Date(
  //     sessionForm["year"],
  //     sessionForm["month"] - 1,
  //     sessionForm["day"],
  //     sessionForm["start"],
  //     0,
  //     0
  //   );
  //   setIsAddingSession(false);
  //   const response = await API_AddNewSession(
  //     auth.id,
  //     {
  //       startTime: startTime,
  //       subjectId: sessionForm.subjectId,
  //     },
  //     auth.accessToken
  //   );
  //   const data = await response.json();

  //   window.location.reload();
  // };

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
    <div className={classes.Container}>
      <div
        className={`${classes.SidebarContainer} ${
          collapsed ? `${classes.SidebarCollapsed}` : ""
        }`}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div
        className={`${classes.MainContainer} ${
          collapsed ? classes.MainContainerCollapsed : ""
        }`}
      >
        <div
          className={`${classes.WeekViewContainer} ${
            collapsed ? classes.WeekViewContainerCollapsed : ""
          }`}
        >
          {isManagingTimeSlots ? (
            <WeekViewEdit
              focusedDay={focusedDay}
              setFocusedDay={setFocusedDay}
              timeslotMap={timeslotMap}
              setManagingTimeSlots={setManagingTimeSlots}
              subjectList={subjectList}
              // processedTimeSlots={generateTimeslots(
              //   filterTimeslots(monthData, focusedDay)
              // )}
              processedTimeslots={processedTimeslots}
              startOfWeek={startOfWeek}
            />
          ) : (
            <WeekViewDisplay
              focusedDay={focusedDay}
              setFocusedDay={setFocusedDay}
              // processedTimeSlots={generateTimeslots(
              //   filterTimeslots(monthData, focusedDay)
              // )}
              processedTimeslots={processedTimeslots}
            />
          )}
        </div>
        <div className={classes.MonthViewContainer}>
          <CalendarView
            focusedDay={focusedDay}
            setFocusedDay={setFocusedDay}
            monthData={monthData}
          />
          {/* <AvailabilityFormBox subjectList={subjectList} /> */}
          {!isManagingTimeSlots ? (
            <div className={classes.ManageButtonBox}>
              <div className={classes.ManageButtonTextBox}>
                <div className={classes.ManageButtonTitle}>
                  Reach out to over 200 Students
                </div>
                <div>
                  <AiFillFire /> {`200 + students taking lesson at the moment`}
                </div>
              </div>
              <button
                className={classes.ManageButton}
                onClick={() => {
                  setManagingTimeSlots(true);
                }}
              >
                Manage time slot
              </button>
            </div>
          ) : (
            <div className={classes.colorInfoBox}>
              <div>
                <div
                  className={classes.colorSquare}
                  style={{ backgroundColor: "#0045a9" }}
                ></div>
                <p className={classes.colorInfoText}>Registered</p>
              </div>
              <div>
                <div
                  className={classes.colorSquare}
                  style={{ backgroundColor: "rgb(249, 87, 70)" }}
                ></div>
                <p className={classes.colorInfoText}>Unregister</p>
              </div>
              <div>
                <div
                  className={classes.colorSquare}
                  style={{ backgroundColor: "rgb(255, 176, 23)" }}
                ></div>
                <p className={classes.colorInfoText}>Selected</p>
              </div>
              <div>
                <div
                  className={classes.colorSquare}
                  style={{ backgroundColor: "black" }}
                ></div>
                <p className={classes.colorInfoText}>Fixed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;

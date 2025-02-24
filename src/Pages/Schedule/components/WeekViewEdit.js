import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import classes from "./WeekViewEdit.module.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getTimeString = (index) => {
  if (index < 0 || index >= 7 * 48) {
    throw new Error("Index out of range. Must be between 0 and 335.");
  }

  const row = Math.floor(index / 7); // Determines the time slot (0-47, one per 30-min interval)
  const hours = Math.floor(row / 2) % 12 || 12; // Convert to 12-hour format
  const minutes = (row % 2) * 30; // 0 or 30 minutes
  const period = Math.floor(row / 2) < 12 ? "AM" : "PM"; // AM/PM classification

  return `${hours}:${minutes === 0 ? "00" : "30"} ${period}`;
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

const getStartDateString = (focusedDay) => {
  return new Date(
    new Date(focusedDay).setDate(focusedDay.getDate() - focusedDay.getDay())
  );
};

const WeekView = ({
  focusedDay,
  setFocusedDay,
  availabilityList,
  setAvailabilityList,
  sessionSlotList,
  mergedSessionSlotList,
  timeslotMap,
  setManagingTimeSlots,
  subjectList,
}) => {
  //   const [focusedDay, setFocusedDay] = useState(new Date());

  const [delta, setDelta] = useState({ selected: [], unregistered: [] });

  const [tempTimeslotMap, setTempTimeslotMap] = useState({
    ...timeslotMap,
  });
  const [edited, setEdited] = useState(false);
  const [selectedSubjectList, setSelectedSubjectList] = useState([]);
  const auth = useContext(AuthContext);

  const moveWeek = (direction) => {
    if (direction === "prev") {
      const startDay = new Date(focusedDay);
      startDay.setDate(startDay.getDate() - focusedDay.getDay());
      const prevDay = startDay.setDate(startDay.getDate() - 7);
      setFocusedDay(new Date(prevDay));
    } else if (direction === "next") {
      const startDay = new Date(focusedDay);
      startDay.setDate(startDay.getDate() - focusedDay.getDay());
      const prevDay = startDay.setDate(startDay.getDate() + 7);
      setFocusedDay(new Date(prevDay));
    }
  };

  useEffect(() => {
    if (delta.selected.length + delta.unregistered.length > 0) {
      setEdited(true);
    } else {
      setEdited(false);
    }
  }, [delta]);

  const handleSlotClick = (index) => {
    if (tempTimeslotMap[index].status === "none") {
      setDelta((prev) => {
        const newSelected = [...prev.selected];
        newSelected.push(index);
        return { ...prev, selected: [...newSelected] };
      });
      setTempTimeslotMap((prev) => {
        const newObj = { ...tempTimeslotMap[index] };
        newObj.status = "select";
        return { ...prev, [index]: { ...newObj } };
      });
    } else if (tempTimeslotMap[index].status === "select") {
      setDelta((prev) => {
        const newSelected = prev.selected.filter((item) => item !== index);
        return { ...prev, selected: [...newSelected] };
      });
      setTempTimeslotMap((prev) => {
        const newObj = { ...tempTimeslotMap[index] };
        newObj.status = "none";
        return { ...prev, [index]: { ...newObj } };
      });
    } else if (tempTimeslotMap[index].status === "registered") {
      setDelta((prev) => {
        const newUnregistered = [...prev.unregistered];
        newUnregistered.push(index);
        return { ...prev, unregistered: [...newUnregistered] };
      });
      setTempTimeslotMap((prev) => {
        const newObj = { ...tempTimeslotMap[index] };
        newObj.status = "unregister";
        return { ...prev, [index]: { ...newObj } };
      });
    } else if (tempTimeslotMap[index].status === "unregister") {
      setDelta((prev) => {
        const newUnregistered = prev.unregistered.filter(
          (item) => item !== index
        );
        return { ...prev, unregistered: [...newUnregistered] };
      });
      setTempTimeslotMap((prev) => {
        const newObj = { ...tempTimeslotMap[index] };
        newObj.status = "registered";
        return { ...prev, [index]: { ...newObj } };
      });
    }
  };

  const subjectSelectHandler = (e) => {
    if (e.target.value !== "select") {
      const subject = subjectList.find((s) => s.subject._id === e.target.value);
      setSelectedSubjectList((prev) => {
        return prev.find((s) => s.subject._id === e.target.value)
          ? prev
          : [...prev, subject];
      });
    }
  };

  const saveChangesHander = useCallback(async () => {
    try {
      if (edited) {
        const startOfWeek = new Date(
          focusedDay.getFullYear(),
          focusedDay.getMonth(),
          focusedDay.getDate() - focusedDay.getDay(),
          0,
          0,
          0
        );
        const changedData = { add: [], remove: [], subjectList: [] };
        selectedSubjectList.forEach((s) => {
          changedData.subjectList.push(s.subject._id);
          if (delta.selected.length > 0) {
          }
        });
        delta.selected.forEach((index) => {
          const day = index % 7;
          const timeOffset = ((index - day) / 7) * 30;
          const startTime = new Date(
            startOfWeek.getFullYear(),
            startOfWeek.getMonth(),
            startOfWeek.getDate() + day,
            0,
            timeOffset,
            0
          ).toISOString();
          changedData.add.push(startTime);
        });
        delta.unregistered.forEach((index) => {
          const idToDelete = timeslotMap[index].item._id;
          changedData.remove.push(idToDelete);
        });
        if (delta.selected.length > 0 && selectedSubjectList.length === 0) {
          alert("Please select subjects before adding timeslots!");
        } else {
          const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
              `/tutors/${auth.id}/availabilities`,
            {
              method: "PUT",
              body: JSON.stringify(changedData),
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.accessToken,
              },
              credentials: "include",
            }
          );
          const data = await response.json();
          console.log(data);
          if (data.status === 200) {
            window.location.reload();
          }
        }
      }
    } catch (e) {
      console.log("Error saving changes", e);
    }
  }, [edited, focusedDay, delta, timeslotMap, auth, selectedSubjectList]);

  return (
    <div className={classes.Container}>
      <div className={classes.WeekInfoHeader}>
        <div className={classes.WeekInfoBox}>
          <div className={classes.DateString}>
            {formatWeekString(focusedDay)}
          </div>
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
        <div className={classes.subjectToggleButtonBox}>
          {delta.selected.length > 0 ? (
            <div className={classes.subjectBox}>
              <select onChange={subjectSelectHandler}>
                <option value={"select"}>Select subjects</option>
                {subjectList.map((subject) => {
                  return (
                    <option
                      key={subject.subject._id}
                      value={subject.subject._id}
                    >
                      {subject.subject.title}
                    </option>
                  );
                })}
              </select>

              <div className={classes.subjectList}>
                {selectedSubjectList.map((item) => {
                  return (
                    <div key={item.subject._id}>
                      <div>{item.subject.title}</div>
                      <button
                        onClick={() => {
                          setSelectedSubjectList((prev) => {
                            return prev.filter(
                              (s) => s.subject._id !== item.subject._id
                            );
                          });
                        }}
                      >
                        remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          <div className={classes.toggleButtonBox}>
            <button
              className={`${
                edited ? classes.saveButton : classes.saveButtonInactive
              }`}
              disabled={edited ? false : true}
              onClick={saveChangesHander}
            >
              Save changes
            </button>
            <button
              className={classes.cancelButton}
              onClick={() => {
                setManagingTimeSlots(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className={classes.headerTimetable}>
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
              style={{ gridRow: 1, gridColumn: index + 1 }}
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
          {Object.keys(tempTimeslotMap).map((_, index) => {
            const day = index % 7;
            const column = day + 1;
            const row = (index - day) / 7 + 1;
            const status = tempTimeslotMap[index].status;

            return (
              <div
                key={`empty-${index}`}
                className={`${
                  status === "none"
                    ? classes.cell
                    : status === "registered"
                    ? classes.registeredCell
                    : status === "select"
                    ? classes.selectedCell
                    : status === "unregister"
                    ? classes.unregisterCell
                    : classes.fixedCell
                }`}
                style={{ gridRow: row, gridColumn: column }}
                onClick={() => {
                  if (status !== "fixed") {
                    handleSlotClick(index);
                  }
                }}
              >
                {getTimeString(index)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;

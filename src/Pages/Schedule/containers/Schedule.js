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
  const auth = useContext(AuthContext);

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

  return (
    <div className={classees.Container}>
      <div className={classees.SidebarContainer}>Sidebar</div>
      <div className={classees.WeekViewContainer}>
        <AvailabilityFormBox />
        <WeekView focusedDay={focusedDay} setFocusedDay={setFocusedDay} />
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

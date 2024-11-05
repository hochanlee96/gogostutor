import { useState, useEffect, useCallback, useContext } from "react";

import { EditSession } from "../components/Session.js";
import Calendar from "../components/Calendar.js";
import { AuthContext } from "../../../shared/context/auth-context.js";

const Schedule = () => {
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  const [isLoadingSubjectList, setIsLoadingSubjectList] = useState(true);
  const auth = useContext(AuthContext);

  const saveHandler = async (sessionForm) => {
    const startTime = new Date(
      sessionForm["year"],
      sessionForm["month"] - 1,
      sessionForm["day"],
      sessionForm["start"],
      0,
      0
    );
    console.log(startTime);
    setIsAddingSession(false);
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/tutor/add-session",
      {
        method: "POST",
        body: JSON.stringify({
          startTime: startTime,
          subjectId: sessionForm.subjectId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    window.location.reload();
  };

  const fetchTeachableSubjects = useCallback(async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/tutor/get-my-subject-list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
      }
    );
    const data = await response.json();
    console.log(data.subjectList);
    setSubjectList(data.subjectList);
  }, [auth.accessToken]);

  useEffect(() => {
    fetchTeachableSubjects();
    setIsLoadingSubjectList(false);
  }, [fetchTeachableSubjects, isLoadingSubjectList]);

  return (
    <div>
      <h3>Set availability for next month</h3>
      {isLoadingSubjectList ? (
        <div>Loading...</div>
      ) : subjectList && subjectList.length > 0 ? (
        isAddingSession ? (
          <EditSession
            saveHandler={saveHandler}
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
      <Calendar />
    </div>
  );
};

export default Schedule;

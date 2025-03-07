import { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";

import { API_UpdateTutorSession } from "../../../API";

const Session = ({
  startTime,
  sessionDeleteHandler,
  sessionId,
  status,
  subject,
  studentId,
}) => {
  const [mode, setMode] = useState("show");
  const [sessionForm, setSessionForm] = useState({
    year: new Date(startTime).getFullYear(),
    month: new Date(startTime).getMonth() + 1,
    day: new Date(startTime).getDate(),
    start: new Date(startTime).getHours(),
    courseId: "",
  });
  const [editForm, setEditForm] = useState(sessionForm);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const sessionEditHandler = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const saveEditedSessionHandler = useCallback(async () => {
    const startTime = new Date(
      sessionForm["year"],
      sessionForm["month"] - 1,
      sessionForm["day"],
      sessionForm["start"],
      0,
      0
    );
    const response = await API_UpdateTutorSession(
      auth.tutorId,
      sessionId,
      { action: "edit", sessionData: { startTime: startTime } },
      auth.accessToken
    );
    const data = await response.json();
    console.log(data);
    window.location.reload();
    setSessionForm({});
  }, [auth, sessionForm, sessionId]);

  const approveStudentHandler = useCallback(async () => {
    const response = await API_UpdateTutorSession(
      auth.id,
      sessionId,
      { action: "approve" },
      auth.accessToken
    );

    const data = await response.json();
    console.log(data);
    window.location.reload();
    setSessionForm({});
  }, [auth, sessionId]);

  let sessionComponent;
  if (mode === "show") {
    sessionComponent = (
      <div>
        <div>{"Course subject: " + subject.title}</div>
        <div>startTime</div>
        <div>Year: {sessionForm.year}</div>
        <div>Month: {sessionForm.month}</div>
        <div>Day: {sessionForm.day}</div>
        <div>
          Start Time: {startTime ? new Date(startTime).getHours() : null}
        </div>
        <div>
          Status:{" "}
          {new Date() > new Date(startTime) ? "Start Time Passed" : status}
        </div>
        <div>{status === "applied" ? `student: ${studentId}` : ""}</div>
        {status === "applied" ? (
          <div>
            <button
              onClick={() => {
                approveStudentHandler();
              }}
            >
              approve
            </button>
            <button>Cancel</button>
          </div>
        ) : status === "approved" ? (
          <button
            onClick={() =>
              //  navigate("/learn/" + sessionId);
              window.open(
                `https://learn.lvh.me:3003/learn/${sessionId}`,
                "_self"
              )
            }
          >
            Start Session..this is for test purposes
          </button>
        ) : null}
        {status === "open" ? (
          <div>
            <button onClick={() => sessionDeleteHandler(sessionId)}>
              Delete
            </button>
            {/* <button onClick={() => setMode("edit")}>Edit</button> */}
          </div>
        ) : null}
      </div>
    );
  } else if (mode === "edit" && status !== "applied") {
    sessionComponent = (
      <div>
        Edit session
        <div>year</div>
        <input
          name="year"
          value={editForm.year}
          onChange={sessionEditHandler}
        />
        <div>month</div>
        <input
          name="month"
          value={sessionForm.month}
          onChange={sessionEditHandler}
        />
        <div>day</div>
        <input name="day" value={editForm.day} onChange={sessionEditHandler} />
        <div>Start time</div>
        <input
          name="start"
          value={editForm.start}
          onChange={sessionEditHandler}
        />
        <button onClick={saveEditedSessionHandler}>Save</button>
        <button
          onClick={() => {
            setEditForm(sessionForm);
            setMode("show");
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
  return <> {sessionComponent}</>;
};

const EditSession = ({ saveHandler, year, month, date, subjectList }) => {
  const [sessionForm, setSessionForm] = useState({
    year: year,
    month: month,
    day: date,
    start: 9,
    subjectId: "",
  });

  const sessionEditHandler = (event) => {
    setSessionForm({ ...sessionForm, [event.target.name]: event.target.value });
  };

  const sessionSaveHandler = () => {
    saveHandler(sessionForm);
    setSessionForm({});
  };

  const subjectSelectHandler = (e) => {
    console.log(e.target.value);
    setSessionForm({ ...sessionForm, subjectId: e.target.value });
  };

  return (
    <div>
      Edit session
      <div>year</div>
      <input
        name="year"
        value={sessionForm.year}
        onChange={sessionEditHandler}
      />
      <div>month</div>
      <input
        name="month"
        value={sessionForm.month}
        onChange={sessionEditHandler}
      />
      <div>day</div>
      <input name="day" value={sessionForm.day} onChange={sessionEditHandler} />
      <div>Start time</div>
      <input
        name="start"
        value={sessionForm.start}
        onChange={sessionEditHandler}
      />
      <select onChange={subjectSelectHandler}>
        <option>Select a subject</option>
        {subjectList.map((subject) => {
          console.log(subject);
          return (
            <option key={subject.subject._id} value={subject.subject._id}>
              {subject.subject.title}
            </option>
          );
        })}
      </select>
      <button onClick={sessionSaveHandler}>Save</button>
      <button onClick={saveHandler}>Cancel</button>
    </div>
  );
};

export { Session, EditSession };

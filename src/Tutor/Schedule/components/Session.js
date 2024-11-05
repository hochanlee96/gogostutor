import { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";

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

  const sessionSaveHandler = useCallback(async () => {
    const startTime = new Date(
      sessionForm["year"],
      sessionForm["month"] - 1,
      sessionForm["day"],
      sessionForm["start"],
      0,
      0
    );
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/tutor/edit-session",
      {
        method: "PUT",
        body: JSON.stringify({
          sessionId: sessionId,
          startTime: startTime,
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
    setSessionForm({});
  }, [auth.accessToken, sessionForm, sessionId]);

  const approveSessionHandler = useCallback(async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/tutor/sessions",
      {
        method: "PUT",
        body: JSON.stringify({
          action: "approve",
          sessionId: sessionId,
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
                approveSessionHandler();
              }}
            >
              approve
            </button>
            <button>Cancel</button>
          </div>
        ) : status === "approved" ? (
          <button onClick={() => navigate("/tutor/learn/" + sessionId)}>
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
        <button onClick={sessionSaveHandler}>Save</button>
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

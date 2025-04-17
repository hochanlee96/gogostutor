import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";

import { API_GetTutorSubjects } from "../../../API.js";

import SubjectList from "../components/SubjectList";
import NewSubject from "../components/NewSubject";

import classes from "./MySubjects.module.css";

const MySubjects = () => {
  const [currentMode, setCurrentMode] = useState("subjectList");
  const [loadedSubjects, setLoadedSubjects] = useState(false);
  const [subjectList, setSubjectList] = useState([]);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const getTutorSubjects = useCallback(async () => {
    try {
      const response = await API_GetTutorSubjects(auth.id, auth.accessToken);
      const data = await response.json();
      setSubjectList(data.subjectList);
      setLoadedSubjects(true);
    } catch (err) {
      console.log(err);
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      getTutorSubjects();
    }
  }, [auth, getTutorSubjects]);

  let mainContent = (
    <SubjectList
      setCurrentMode={setCurrentMode}
      subjectList={subjectList}
      loadedSubjects={loadedSubjects}
    />
  );
  if (currentMode === "newSubject") {
    mainContent = <NewSubject setCurrentMode={setCurrentMode} />;
  }
  return (
    <div>
      <div className={classes.Container}>
        <div
          style={{
            display: "flex",
            gap: "8px",
            fontSize: "16px",
            fontWeight: "700",
            color: "#72787F",
          }}
        >
          <div
            className={classes.routingTab}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </div>
          <div>{"<"}</div>
          <div className={classes.routingTab}>My Subjects</div>
        </div>
        <div className={classes.Header}>
          <div style={{ fontSize: "22px", fontWeight: "700" }}>My Subjects</div>
          <button
            className={classes.ApplyButton}
            onClick={() => {
              setCurrentMode((prev) => {
                return prev === "subjectList" ? "newSubject" : "subjectList";
              });
            }}
          >
            {currentMode === "subjectList"
              ? "Apply for a new subject"
              : "Cancel"}
          </button>
        </div>
        {mainContent}
      </div>
    </div>
  );
};

export default MySubjects;

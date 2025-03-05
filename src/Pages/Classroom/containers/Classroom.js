import { useState, useEffect, useCallback, useContext } from "react";

import Sidebar from "../../../shared/component/Sidebar/Sidebar.js";
import SessionListComponent from "../components/SessionListComponent.js";
import CourseBox from "../components/CourseBox.js";

import { AuthContext } from "../../../shared/context/auth-context.js";

import classes from "./Classroom.module.css";

const Classroom = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeBar, setActiveBar] = useState("Upcoming");
  const [sessionList, setSessionList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const auth = useContext(AuthContext);

  ////////modules
  const fetchTutorSessions = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/tutors/${auth.id}/sessions`,
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
      if (data.status === 200) {
        setSessionList(data.sessionList);
        // setSubjectList(data.subjectList);
        console.log(data.totalSubjects);
        setSubjectList(data.totalSubjects);
      } else {
        alert("An error has occured");
      }
    } catch (error) {
      console.log(error);
    }
  }, [auth]);

  //////effects
  useEffect(() => {
    fetchTutorSessions();
  }, [fetchTutorSessions]);

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
          className={`${classes.SessionViewContainer} ${
            collapsed ? classes.SessionViewContainerCollapsed : ""
          }`}
        >
          <div className={classes.MainHeader}>
            <div
              className={`${classes.MainHeaderComponent} 
            ${
              activeBar === "Upcoming" ? classes.MainHeaderComponentActive : ""
            }`}
              onClick={() => {
                setActiveBar("Upcoming");
              }}
            >
              Upcoming class
            </div>
            <div
              className={`${classes.MainHeaderComponent} 
            ${
              activeBar === "Previous" ? classes.MainHeaderComponentActive : ""
            }`}
              onClick={() => {
                setActiveBar("Previous");
              }}
            >
              Previous class
            </div>
          </div>
          <SessionListComponent
            sessionList={sessionList}
            activeBar={activeBar}
          />
        </div>
        <div className={classes.SideViewContainer}>
          <CourseBox subjectList={subjectList} />
        </div>
      </div>
    </div>
  );
};

export default Classroom;

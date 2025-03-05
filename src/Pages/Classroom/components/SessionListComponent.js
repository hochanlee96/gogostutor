import classes from "./SessionListComponent.module.css";

import { CiMonitor } from "react-icons/ci";

const SessionListComponent = ({ sessionList, activeBar }) => {
  return (
    <div className={classes.sessionsContainer}>
      {sessionList.map((session) => {
        return (
          <div key={session._id} className={classes.sessionItem}>
            <div
              className={classes.sessionTag}
              style={{ backgroundColor: session.subjectId.color }}
            ></div>
            <div className={classes.sessionBox}>
              <div className={classes.sessionInfo}>
                <div style={{ fontSize: "22px", fontWeight: "700" }}>
                  {session.subjectId.title}
                </div>
                <div>{session.startTime}</div>
                <div>{session.endTime}</div>
                <div>{session.studentId._id}</div>
              </div>
              <div className={classes.sessionButtons}>
                <div
                  className={classes.joinButton}
                  onClick={() => {
                    alert("join class");
                  }}
                >
                  Join Class <CiMonitor />{" "}
                </div>
                {/* <button>other button</button> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SessionListComponent;

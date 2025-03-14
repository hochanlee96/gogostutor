import React from "react";
import classes from "./BuildCourse.module.css";
import { FaFire } from "react-icons/fa";

const BuildCourse = () => {
  return (
    <div className={classes.Container}>
      <div style={{ fontSize: "22px", fontWeight: "700" }}>Upcoming Class</div>
      <div className={classes.ContentBox}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "22px", fontWeight: "700" }}>
            You don’t have a class yet
          </div>
          <div style={{ marginRight: "5px" }}>
            <FaFire />
            200+ students taking lessons at the moment
          </div>
        </div>
        <button className={classes.buildButton}>Build Course</button>
      </div>
    </div>
  );
};

export default BuildCourse;

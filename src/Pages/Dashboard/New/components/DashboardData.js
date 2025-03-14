import React from "react";
import classes from "./DashboardData.module.css";
import EmptyUserImage from "../../../../shared/assets/icons/user.png";

import { LiaEdit } from "react-icons/lia";

const DashboardData = ({ userData }) => {
  return (
    <div className={classes.Container}>
      <div className={classes.ProfileBox}>
        <img className={classes.UserIcon} src={EmptyUserImage} alt="/" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: "700" }}>
              Hello, Tiffany
            </div>
            <div
              style={{ fontSize: "12px", fontWeight: "500", color: "#9EA4AA" }}
            >
              email
            </div>
          </div>
          <LiaEdit size="17px" />
        </div>
      </div>
      <div className={classes.DataBox}>
        <div className={classes.DataItem}>
          <div>Hours</div>
          <div>0</div>
        </div>
        <div className={classes.DataItem}>
          <div>Classes</div>
          <div>0</div>
        </div>
        <div className={classes.DataItem}>
          <div>Students</div>
          <div>0</div>
        </div>
        <div className={classes.DataItem}>
          <div>Courses</div>
          <div>0</div>
        </div>
      </div>
      <div>Tutor level: Beginner</div>
    </div>
  );
};

export default DashboardData;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileBox from "../components/ProfileBox";

import classes from "./Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  return (
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
        <div className={classes.routingTab}>Profile</div>
      </div>
      <div className={classes.Header}>
        <div style={{ fontSize: "22px", fontWeight: "700" }}>Tutor Profile</div>
      </div>
      <ProfileBox />
    </div>
  );
};

export default Profile;

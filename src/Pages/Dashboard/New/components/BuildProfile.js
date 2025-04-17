import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./BuildProfile.module.css";
import { FaFire } from "react-icons/fa";

const BuildProfile = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.Container}>
      <div>
        <div style={{ fontSize: "22px", fontWeight: "700" }}>
          Reach out to over 200 students
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "5px" }}>
            <FaFire />
          </div>
          200+ students taking lessons at the moment
        </div>
      </div>
      <button
        className={classes.buildButton}
        onClick={() => {
          navigate("/profile");
        }}
      >
        Build Profile
      </button>
    </div>
  );
};

export default BuildProfile;

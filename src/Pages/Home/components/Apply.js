import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Apply.module.css";

const Apply = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.applyWrapper}>
      <h2 className={classes.title}>Apply Here!</h2>
      <p className={classes.text}>
        Once you click{" "}
        <strong>
          "sign up," you will be linked to a survey that asks about the subjects
          you are available to teach.
        </strong>{" "}
        After that, you will receive tutor’s placement tests.
      </p>
      <p className={classes.text}>
        Please note that you must hold a Google Account to complete the sign up.
      </p>
      {isLoggedIn ? null : (
        <button
          className={classes.button}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </button>
      )}
    </div>
  );
};

export default Apply;

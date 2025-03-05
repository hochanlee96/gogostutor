import React, { useState, useCallback } from "react";
import classes from "./CompleteProfile.module.css";

import SignupStep from "../components/SignupStep.js";
import ProfileStep from "../components/ProfileStep.js";

const CompleteProfile = () => {
  const [step, setStep] = useState(1);
  const [signupForm, setSignupForm] = useState({
    email: { value: "", state: "none", touched: false },
    password: { value: "", state: "none", touched: false },
    confirmPassword: { value: "", state: "none", touched: false },
    firstName: { value: "", state: "none", touched: false },
    lastName: { value: "", state: "none", touched: false },
    dateOfBirth: { value: "", state: "none", touched: false },
    isStudent: false,
  });

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const inputChangeHandler = (event) => {
    if (event.target.name === "email") {
      setSignupForm((prev) => {
        return {
          ...prev,
          email: { value: event.target.value, state: "touched" },
        };
      });
    } else if (event.target.name === "password") {
      setSignupForm((prev) => {
        return {
          ...prev,
          password: { value: event.target.value, state: "touched" },
        };
      });
    } else if (event.target.name === "confirmPassword") {
      setSignupForm((prev) => {
        return {
          ...prev,
          confirmPassword: { value: event.target.value, state: "touched" },
        };
      });
    } else if (event.target.name === "firstName") {
      setSignupForm((prev) => {
        return {
          ...prev,
          firstName: { value: event.target.value, state: "touched" },
        };
      });
    } else if (event.target.name === "lastName") {
      setSignupForm((prev) => {
        return {
          ...prev,
          lastName: { value: event.target.value, state: "touched" },
        };
      });
    }
  };

  const formValid = useCallback(
    (step) => {
      if (step === 1) {
        return (
          signupForm.email.state === "valid" &&
          signupForm.password.state === "valid" &&
          signupForm.confirmPassword.state === "valid"
        );
      } else {
        return true;
      }
    },
    [
      signupForm.email.state,
      signupForm.password.state,
      signupForm.confirmPassword.state,
    ]
  );

  return (
    <div className={classes.container}>
      {/* Logo */}
      <h1 className={classes.logo}>Gogos Edu</h1>

      {/* Step Progress Bar */}
      <div className={classes.progressContainer}>
        <div className={classes.step}>
          <div
            className={`${classes.circle} ${step >= 1 ? classes.active : ""}`}
          >
            1
          </div>
        </div>
        <div
          className={`${classes.line} ${step >= 2 ? classes.filled : ""}`}
        ></div>
        <div className={classes.step}>
          <div
            className={`${classes.circle} ${step >= 2 ? classes.active : ""}`}
          >
            2
          </div>
        </div>
        <div
          className={`${classes.line} ${step >= 3 ? classes.filled : ""}`}
        ></div>
        <div className={classes.step}>
          <div
            className={`${classes.circle} ${step >= 3 ? classes.active : ""}`}
          >
            3
          </div>
        </div>
      </div>

      {/* Form Content */}
      {step === 1 && (
        <SignupStep
          signupForm={signupForm}
          setSignupForm={setSignupForm}
          inputChangeHandler={inputChangeHandler}
        />
      )}
      {step === 2 && (
        <ProfileStep
          inputChangeHandler={inputChangeHandler}
          signupForm={signupForm}
        />
      )}

      {/* Navigation Buttons */}
      <div className={classes.buttonContainer}>
        {step > 1 && (
          <button className={classes.button} onClick={prevStep}>
            Back
          </button>
        )}
        <button
          className={`${classes.button}  ${
            step === 3 || !formValid(step) ? classes.disabled : ""
          }`}
          onClick={nextStep}
          disabled={step === 3}
        >
          {step === 3 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default CompleteProfile;

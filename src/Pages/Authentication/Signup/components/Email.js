import { useState, useEffect } from "react";

import validator from "validator";

import { API_CheckEmailExists } from "../../../../API";
import Loading from "../../../../shared/components/Loading/Loading";

import classes from "./Email.module.css";

const Email = ({
  setContentStep,
  setForm,
  verificationState,
  setVerificationState,
}) => {
  const [emailInput, setEmailInput] = useState("");
  const [inputState, setInputState] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkboxErrorMessage, setCheckboxErrorMessage] = useState("");

  const inputChangeHandler = (event) => {
    setInputState("");
    setInputErrorMessage("");
    setCheckboxErrorMessage("");
    setEmailInput(event.target.value);
  };

  const sendVerificationEmail = async () => {
    try {
      setVerificationState("sending");
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/tutors/send-verification`,
        {
          method: "POST",
          body: JSON.stringify({ email: emailInput }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.status === 200) {
        setVerificationState("sent");
      } else {
        alert("Failed to send verification email.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setInputErrorMessage("");
      setCheckboxErrorMessage("");
      //first check if email format is correct
      if (!inputValid) {
        setInputState("Error");
        setInputErrorMessage("Please provide a proper email address");
      } else {
        //check if checkbox is checked
        if (!checked) {
          setCheckboxErrorMessage("Please agree to the terms");
        } else {
          //if there is not any error, check if email exists
          if (checked && inputValid) {
            const response = await API_CheckEmailExists(emailInput);
            const data = await response.json();
            //if doesn't exist fill in the form
            if (data.message === "available") {
              setForm((prev) => {
                return { ...prev, email: emailInput };
              });
              sendVerificationEmail();
              setContentStep("Create");
              //if exists or error display error message
            } else if (data.message === "exists") {
              setInputState("Exists");
              setInputErrorMessage("This email address already exists");
            } else {
              setInputState("Error");
              setInputErrorMessage("There was an error");
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const isEmail = validator.isEmail(emailInput);
    setInputValid(isEmail);
  }, [emailInput]);

  return (
    <div className={classes.EmailContainer}>
      <div className={classes.ContentContainer}>
        <div className={classes.TextContainer}>
          <div className={classes.titleText}>Sign up with email</div>
          <div className={classes.DescriptionText}>
            Sign up, qualify, and start connecting with students.
          </div>
        </div>
        <form className={classes.signUpFormBody} onSubmit={onSubmitHandler}>
          <div className={classes.EmailBox}>
            <input
              className={`${classes.emailInput} ${
                inputState === "Exists" || inputState === "Error"
                  ? classes.emailInputError
                  : ""
              }`}
              placeholder="Email"
              type="email"
              name="email"
              value={emailInput}
              onChange={inputChangeHandler}
              onInvalid={(e) => {
                e.preventDefault();
                setInputState("Error");
                setInputErrorMessage("Please provide a proper email address");
              }}
              onFocus={() => {
                setInputState("none");
                setInputErrorMessage("");
              }}
            />
            {inputErrorMessage && (
              <div className={classes.ErrorMessageBox}>{inputErrorMessage}</div>
            )}
          </div>
          <div className={classes.termsBox}>
            <label className={classes.customCheckbox}>
              <input
                className={`${classes.checkbox} `}
                type="checkbox"
                checked={checked}
                onChange={() => {
                  setChecked((prev) => !prev);
                }}
                onFocus={() => {
                  setCheckboxErrorMessage("");
                }}
              />
              <span
                className={`${classes.checkmark} ${
                  checkboxErrorMessage ? classes.checkmarkError : ""
                }`}
              ></span>
            </label>
            <div className={classes.termsText}>
              <span>{`I agree to Gogos Edu’s `}</span>
              <span className={classes.termsOfService}>Terms of Service</span>
              <span>{`, `}</span>
              <span className={classes.termsOfService}>Privacy Policy</span>
              <span>{` and `}</span>
              <span className={classes.termsOfService}>
                Data Processing Agreement.
              </span>
            </div>
          </div>
          <button
            disabled={
              inputErrorMessage ||
              checkboxErrorMessage ||
              verificationState === "sending"
            }
            type="submit"
            className={`${classes.createButton} 
            `}
          >
            {verificationState === "sending" ? <Loading /> : "Verify Email"}
          </button>
          <div className={classes.recaptchaText}>
            {`This site is protected by reCAPTCHA and the Google `}
            <span className={classes.link}>Privacy Policy</span>
            {` and `}
            <span className={classes.link}>Terms of Service</span> apply.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Email;

// How to test email input flow
// 1. Enter a wrong email input -> should display red error message
// 2. Enter a proper email input, press button without checking the checkbox -> should display red error message
// 3. Enter a proper email input (that already exists), check the checkbox -> should display red error message
//Button should look disabled if there is any error message present

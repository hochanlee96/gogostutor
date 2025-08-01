import { useState, useEffect, useCallback } from "react";
import validator from "validator";

import { ReactComponent as Check } from "../../../../shared/assets/icons/check.svg";
import { ReactComponent as ShowPasswordIcon } from "../../../../shared/assets/icons/eye-show.svg";
import { ReactComponent as HidePasswordIcon } from "../../../../shared/assets/icons/eye-hide.svg";

import classes from "./Create.module.css";
const SetPassword = ({
  form,
  setForm,
  verificationState,
  setContentStep,
  setIndexStep,
  setVerificationState,
  initializeForm,
}) => {
  const [passwordInput, setPasswordInput] = useState(form.password);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const inputChangeHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  const passwordValidateHandler = useCallback(() => {
    const isLongEnough = validator.isLength(passwordInput, {
      min: 8,
    });

    // Check if password contains at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(passwordInput);

    if (isLongEnough && hasUppercase) {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  }, [passwordInput]);
  const handleOnClickShowPassword = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");

    setShowPassword(!showPassword);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (!inputValid) {
      setPasswordErrorMessage(
        "Password must be at least 8 characters, with one uppercase letter"
      );
    } else {
      setForm((prev) => {
        return { ...prev, password: passwordInput };
      });
      setIndexStep(3);
    }
  };

  useEffect(() => {
    passwordValidateHandler();
  }, [passwordValidateHandler]);
  return (
    <>
      <div className={classes.ContentBox}>
        <div className={classes.Index}>2 of 3</div>
        <div className={classes.Content}>
          <div className={classes.HeadingText}>
            Create a<b className={classes.Strong}>{` strong `}</b>
            password
          </div>
          <div className={classes.Subtext}>
            Just a few more steps and you're done! We hate paperwork, too.
          </div>
          <form onSubmit={submitHandler} className={classes.FormBox}>
            <div className={classes.InputBox}>
              <div className={classes.InputLine}>
                <input
                  className={`${classes.Input} ${classes.InputConfirmed}`}
                  disabled={true}
                  value={form.email}
                />
                <Check className={classes.InputIcon} />
                {verificationState === "verified" && (
                  <div className={classes.VerifiedMessageBox}>
                    {"Email Verified!"}
                  </div>
                )}
              </div>
              <div className={classes.InputLine}>
                <input
                  title="Password"
                  name="password"
                  value={passwordInput}
                  onChange={inputChangeHandler}
                  type={passwordType}
                  placeholder="Password"
                  className={`${classes.Input} ${
                    passwordErrorMessage ? classes.InputError : ""
                  }`}
                  onFocus={() => {
                    setPasswordErrorMessage("");
                  }}
                />
                <button
                  className={classes.ShowPasswordButton}
                  onClick={handleOnClickShowPassword}
                  type="button"
                >
                  {showPassword ? (
                    <HidePasswordIcon className={classes.PasswordIcon} />
                  ) : (
                    <ShowPasswordIcon className={classes.PasswordIcon} />
                  )}
                </button>
                {passwordErrorMessage && (
                  <div className={classes.ErrorMessageBox}>
                    {passwordErrorMessage}
                  </div>
                )}
              </div>
            </div>

            <div className={classes.ButtonBox}>
              <button
                className={`${classes.Button} `}
                disabled={passwordErrorMessage || !passwordInput}
              >
                Confirm
              </button>

              <div className={classes.Enter}>
                press
                <b>{` Enter`}</b>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={classes.NavButtons}>
        <button
          className={`${classes.NavButton} ${classes.NavButtonPrev}`}
          onClick={() => {
            setVerificationState("unsent");
            setContentStep("Email");
          }}
        >
          Previous
        </button>

        <button className={`${classes.NavButton} ${classes.NavButtonExit}`}>
          <div
            onClick={() => {
              initializeForm();
              setContentStep("Start");
            }}
          >
            Exit sign up
          </div>
        </button>
      </div>
    </>
  );
};

export default SetPassword;

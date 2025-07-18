import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import Loading from "../../../../shared/components/Loading/Loading";

import classes from "./ForgotPassword.module.css";
import Logo from "../../../../shared/assets/icons/gogos-edu-text-logo-black.svg";
import { InputBox } from "../components/InputBox";

const emailResendTime = 30;

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailState, setEmailState] = useState("initial"); // initial, sending, sent, resending
  const [secondsLeft, setSecondsLeft] = useState(emailResendTime);
  const [resendActive, setResendActive] = useState(false);
  // const [emailSent, setEmailSent] = useState(false);
  // const [retry, setRetry] = useState(false);
  // const [showRetryText, setShowRetryText] = useState(false);
  const navigate = useNavigate();

  const inputChangeHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const handleGoBackButton = () => {
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleEmailValidator = () => {
    setEmailValid(true);
    setErrorMessage("");
    const isEmail = validator.isEmail(emailInput);
    if (!isEmail) {
      setErrorMessage("Please check your email input");
      setEmailValid(false);
    }
  };

  const sendPasswordResetLinkHandler = async () => {
    try {
      setEmailState((prev) => {
        return prev === "initial" ? "sending" : "resending";
      });
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/students/reset-password-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailInput }),
          // credentials: "include",
        }
      );
      const data = await response.json();
      if (data.message === "unavailable") {
        // alert("User with this email does not exist");
        setEmailState("sent");
        setSecondsLeft(emailResendTime);
        setResendActive(false);
      } else {
        setEmailState("sent");
        setSecondsLeft(emailResendTime);
        setResendActive(false);

        //   alert("Password reset link is sent to your email address");
        //   setEmailSent(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (emailValid) {
      sendPasswordResetLinkHandler();
      // setEmailSent(true);
      // setShowRetryText(false);
      // setRetry(false);
      // setTimeout(() => {
      //   setRetry(true);
      // }, 5000);
    } else {
    }
  };

  useEffect(() => {
    setEmailValid(validator.isEmail(emailInput));
  }, [emailInput]);

  useEffect(() => {
    let timer;
    if (secondsLeft > 0) {
      timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    } else {
      setResendActive(true);
    }
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <div className={classes.Container}>
      <div className={classes.Modal}>
        <button className={classes.LogoButton} onClick={handleLogoClick}>
          <img alt="logo" src={Logo} />
        </button>
        <div className={classes.UpperTextContainer}>
          {emailState === "sent" || emailState === "resending" ? (
            <>
              {emailState === "resending" ? (
                <div className={classes.HeaderText}>
                  {"Resending Email ..."}
                </div>
              ) : (
                <div className={classes.HeaderText}>{"Email Sent!"}</div>
              )}
              <div className={classes.BodyText}>
                If an account exists for {emailInput}, you will get an email
                with instructions on resetting your password. If it doesn't
                arrive, be sure to check your spam folder.
              </div>
            </>
          ) : (
            <>
              <div className={classes.HeaderText}>Forgot your password?</div>
              <div className={classes.BodyText}>
                Please enter the email address you used to create your account
              </div>
            </>
          )}
        </div>
        <form
          className={classes.LowerUserInteractionContainer}
          onSubmit={onSubmitHandler}
        >
          {(emailState === "initial" || emailState === "sending") && (
            <div className={classes.EmailContainer}>
              <InputBox
                title={"Email"}
                name={"Email"}
                value={emailInput}
                type={"email"}
                placeholder={"Enter your email address"}
                onChange={inputChangeHandler}
                disabled={
                  emailState === "sending" || emailState === "resending"
                }
                error={!!errorMessage}
                errorMessage={errorMessage}
                onFocus={() => {
                  setErrorMessage("");
                }}
                onBlur={handleEmailValidator}
              />
            </div>
          )}
          {emailState === "sent" && (
            <div className={classes.DidNotRecieveText}>Didn’t receive?</div>
          )}

          <>
            {emailState === "initial" ? (
              <button
                className={`${classes.RequestButton}`}
                disabled={!!errorMessage || !emailInput || !emailValid}
                type="submit"
              >
                <div className={classes.ButtonText}>Request password reset</div>
              </button>
            ) : emailState === "sent" ? (
              <button
                className={`${classes.RequestButton}`}
                disabled={!resendActive}
                type="submit"
              >
                <div className={classes.ButtonText}>
                  Resend Email {`${!resendActive ? `in: ${secondsLeft}s` : ""}`}
                </div>
              </button>
            ) : (
              <button
                className={`${classes.RequestButton}`}
                disabled={
                  emailState === "sending" || emailState === "resending"
                }
                type="submit"
              >
                <div className={classes.ButtonText}>Sending Email ...</div>
                <Loading color={"#c9c7c7"} />
              </button>
            )}
          </>

          <div className={classes.RedirectButtonBox}>
            <button className={classes.BackToLoginButton} onClick={() => {}}>
              <div className={classes.BackToLoginText}>Get Help</div>
            </button>
            <button
              className={classes.BackToLoginButton}
              onClick={handleGoBackButton}
            >
              <div className={classes.BackToLoginText}>Back to Login</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

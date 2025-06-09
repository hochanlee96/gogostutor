import { useState } from "react";
import validator from "validator";

import classes from "./Auth.module.css";
import GogosLogo from "../../../shared/assets/icons/GogosEdu_icon_text_logo.svg";

// const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
const ForgotPassword = () => {
  const [signupForm, setSignupForm] = useState({
    email: { value: "", state: "none", touched: false },
  });
  const [emailSent, setEmailSent] = useState(false);

  const inputChangeHandler = (event) => {
    if (event.target.name === "email") {
      const isEmail = validator.isEmail(event.target.value);
      setSignupForm((prev) => {
        return {
          ...prev,
          email: {
            value: event.target.value,
            touched: true,
            state: isEmail ? "valid" : "invalid",
          },
        };
      });
    }
  };

  const sendPasswordResetLinkHandler = async () => {
    setEmailSent(true);
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/tutors/reset-password-link`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: signupForm.email.value }),
        // credentials: "include",
      }
    );
    const data = await response.json();
    if (data.message === "unavailable") {
      alert("User with this email does not exist");
    } else {
      //   alert("Password reset link is sent to your email address");
      //   setEmailSent(true);
    }
  };

  return (
    <div className={classes.Container}>
      <div className={classes.LoginBox}>
        <div className={classes.Title}>
          <img src={GogosLogo} alt="/" className={classes.Logo} />
        </div>
        <form
          className={classes.FormBox}
          onSubmit={(e) => {
            e.preventDefault();
            sendPasswordResetLinkHandler();
          }}
        >
          <label>Reset Password</label>
          <input
            title="Email"
            name="email"
            value={signupForm.email.value}
            onChange={inputChangeHandler}
            type="email"
            placeholder="Email"
            className={classes.Input}
          />

          <button
            className={`${classes.LoginButton} ${
              signupForm.email.state === "valid" ? classes.LoginButtonValid : ""
            }`}
          >
            {emailSent
              ? "Resend Password Reset Link"
              : "Send Password Reset Link"}
          </button>
        </form>
        {emailSent ? (
          <p>
            Password reset link is set to your email address. This might take a
            few minutes...
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ForgotPassword;

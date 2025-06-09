import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";

import { jwtDecode } from "jwt-decode";

import classes from "./Auth.module.css";
import GogosLogo from "../../../shared/assets/icons/GogosEdu_icon_text_logo.svg";

// const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
const ResetPassword = () => {
  const token = useParams().token;
  const [resetToken, setResetToken] = useState("");
  const [signupForm, setSignupForm] = useState({
    password: { value: "", state: "none", touched: false },
    confirmPassword: { value: "", state: "none", touched: false },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setResetToken(token);
    }
  }, [token]);

  const inputChangeHandler = (event) => {
    if (event.target.name === "password") {
      setSignupForm((prev) => {
        return {
          ...prev,
          password: { value: event.target.value, touched: true },
        };
      });
    } else if (event.target.name === "confirmPassword") {
      setSignupForm((prev) => {
        return {
          ...prev,
          confirmPassword: { value: event.target.value, touched: true },
        };
      });
    }
  };

  const passwordValidateHandler = useCallback(() => {
    const isLongEnough = validator.isLength(signupForm.password.value, {
      min: 8,
    });

    // Check if password contains at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(signupForm.password.value);

    if (isLongEnough && hasUppercase) {
      setSignupForm((prev) => {
        return {
          ...prev,
          password: { ...prev.password, state: "valid" },
        };
      });
    } else {
      setSignupForm((prev) => {
        return {
          ...prev,
          password: { ...prev.password, state: "invalid" },
        };
      });
    }
  }, [signupForm.password.value, setSignupForm]);

  useEffect(() => {
    passwordValidateHandler();
  }, [passwordValidateHandler]);

  const confirmPasswordValidateHandler = useCallback(() => {
    if (signupForm.password.value === signupForm.confirmPassword.value) {
      setSignupForm((prev) => {
        return {
          ...prev,
          confirmPassword: { ...prev.confirmPassword, state: "valid" },
        };
      });
    } else {
      setSignupForm((prev) => {
        return {
          ...prev,
          confirmPassword: { ...prev.confirmPassword, state: "invalid" },
        };
      });
    }
  }, [
    setSignupForm,
    signupForm.password.value,
    signupForm.confirmPassword.value,
  ]);

  useEffect(() => {
    if (signupForm.password.state === "valid") {
      confirmPasswordValidateHandler();
    }
  }, [signupForm.password.state, confirmPasswordValidateHandler]);

  const resetPasswordHandler = useCallback(async () => {
    if (resetToken) {
      const email = jwtDecode(resetToken).email;

      const body = {
        email: email,
        password: signupForm.password.value,
        resetToken: resetToken,
      };

      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/tutors/reset-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.message === "success") {
        alert("Password is successfully changed");
        navigate("/login");
      } else if (data.message === "error") {
        alert("error");
        navigate("/login");
      }
    }
  }, [navigate, signupForm.password.value, resetToken]);

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
            resetPasswordHandler();
          }}
        >
          <input
            title="New Password"
            name="password"
            value={signupForm.password.value}
            onChange={inputChangeHandler}
            type="password"
            placeholder="New Password"
            className={classes.Input}
          />
          <input
            title="Confirm Password"
            name="confirmPassword"
            value={signupForm.confirmPassword.value}
            onChange={inputChangeHandler}
            type="password"
            placeholder="Confirm Password"
            className={classes.Input}
          />

          <button
            className={`${classes.LoginButton}  ${
              signupForm.password.state === "valid" &&
              signupForm.confirmPassword.state === "valid"
                ? classes.LoginButtonValid
                : ""
            }`}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

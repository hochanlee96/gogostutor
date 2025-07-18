import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import classes from "./ResetPassword.module.css";
import Logo from "../../../../shared/assets/icons/gogos-edu-text-logo-black.svg";
import { InputBox } from "../components/InputBox";

const passwordEM =
  "Password must be at least 8 characters, with one uppercase letter.";
const confirmPasswordEM = "Please make sure your password match...";

const ResetPassword = () => {
  const [tokenExpired, setTokenExpired] = useState(false);
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(5);
  const [password, setPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);
  const [isValid, setIsValid] = useState(false);
  const [doPasswordMatch, setDoPasswordMatch] = useState(false);
  const navigate = useNavigate();

  const token = useParams().token;
  // const email = token ? jwtDecode(token).email : "";

  const inputChangeHandler = (event) => {
    if (event.target.name === "password") {
      setPassword(event.target.value);
    } else {
      setConfirmPassword(event.target.value);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isValid) {
      setShowPasswordError(true);
      return;
    }
    if (!doPasswordMatch) {
      setShowConfirmPasswordError(true);
      return;
    }
    if (!token) {
      alert("This page is not active anymore.");
      return;
    }
    try {
      const body = {
        email: email,
        password: password,
        resetToken: token,
      };

      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/students/reset-password`,
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const decoded = jwtDecode(token);

        const hasRequiredFields =
          decoded &&
          decoded.email &&
          decoded.exp &&
          typeof decoded.exp === "number";

        const currentTime = Math.floor(Date.now() / 1000);

        if (!hasRequiredFields || decoded.exp < currentTime) {
          setTokenExpired(true);
          return;
        }

        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/students/check-reset-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ resetToken: token }),
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.message !== "success") {
          setTokenExpired(true);
          return;
        }

        setEmail(decoded.email);
      } catch (error) {
        console.error("Token validation failed:", error);
        setTokenExpired(true);
      }
    };

    if (token) {
      validateToken();
    } else {
      setTokenExpired(true);
    }
  }, [token]);

  useEffect(() => {
    const lengthOk = password.length > 7;
    const hasUpperCase = /[A-Z]/.test(password);

    if (lengthOk && hasUpperCase) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    if (password !== confirmPassword || !password || !confirmPassword) {
      setDoPasswordMatch(false);
    } else {
      setDoPasswordMatch(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isValid) {
      setShowPasswordError(false);
    }
    if (doPasswordMatch) {
      setShowConfirmPasswordError(false);
    }
  }, [isValid, doPasswordMatch]);

  useEffect(() => {
    if (count <= 0) {
      window.close();
      return;
    }
    let timer;
    if (tokenExpired) {
      timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [count, tokenExpired]);

  let mainContent = (
    <>
      <div className={classes.UpperTextContainer}>
        <div className={classes.HeaderText}>Pick a new password</div>
        <div className={classes.BodyText}>
          You'll use your new password to log in to your Gogos account
        </div>
      </div>
      <form
        className={classes.LowerUserInteractionContainer}
        onSubmit={onSubmitHandler}
      >
        <div className={classes.EmailContainer}>
          <InputBox
            title={"Email"}
            name={"email"}
            value={email}
            disabled={true}
          />
          <InputBox
            title={"New Password"}
            name={"password"}
            value={password}
            type={"password"}
            onChange={inputChangeHandler}
            disabled={false}
            error={showPasswordError}
            onFocus={() => {
              setShowPasswordError(false);
            }}
            onBlur={() => {
              if (!isValid) {
                setShowPasswordError(true);
              }
            }}
            errorMessage={showPasswordError ? passwordEM : ""}
          />
          <InputBox
            title={"Confirm New Password"}
            name={"Confirm Password"}
            value={confirmPassword}
            type={"password"}
            onChange={inputChangeHandler}
            disabled={false}
            error={showConfirmPasswordError}
            onFocus={() => {
              setShowConfirmPasswordError(false);
            }}
            onBlur={() => {
              if (!doPasswordMatch) {
                setShowConfirmPasswordError(true);
              }
            }}
            errorMessage={showConfirmPasswordError ? confirmPasswordEM : ""}
          />
        </div>
        <button
          className={`${classes.SaveButton}`}
          disabled={showPasswordError || showConfirmPasswordError}
          type="submit"
        >
          <div className={`${classes.ButtonText} `}>Save and Login</div>
        </button>
      </form>
    </>
  );

  if (tokenExpired) {
    mainContent = (
      <div className={classes.UpperTextContainer}>
        <div className={classes.HeaderText}>This Link is not valid</div>
        <div className={classes.BodyText}>
          This page will close in <b>{count}</b> seconds
        </div>
      </div>
    );
  }

  return (
    <div className={classes.Container}>
      <div className={classes.Modal}>
        <img alt="logo" src={Logo} />
        {mainContent}
      </div>
    </div>
  );
};

export default ResetPassword;

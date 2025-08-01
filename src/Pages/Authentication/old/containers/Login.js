import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import SocialLoginBox from "../components/SocialLoginBox";
import Input from "../../../shared/UI/components/FormElements/Input";
import { AuthContext } from "../../../shared/context/auth-context";
import { UserContext } from "../../../shared/context/user-context";

import { API_Login } from "../../../API";

import classes from "./Auth.module.css";
import GogosLogo from "../../../shared/assets/icons/GogosEdu_icon_text_logo.svg";

// const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [emailValid, setEmailValid] = useState("untouched");
  const [passwordInput, setPasswordInput] = useState("");
  const [remember, setRemember] = useState(true);
  const [validated, setValidated] = useState(true);
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const inputChangeHandler = (event) => {
    if (event.target.name === "email") {
      setEmailInput(event.target.value);
    } else if (event.target.name === "password") {
      setPasswordInput(event.target.value);
    }
  };

  const loginRequestHandler = async () => {
    try {
      const response = await API_Login({
        email: emailInput,
        password: passwordInput,
        remember: remember,
      });
      const data = await response.json();
      const authData = data.authData;
      if (data.status === 200) {
        auth.login(authData.accessToken);
        localStorage.setItem("login", Date.now());
        authData.profileCompleted
          ? navigate("/dashboard")
          : navigate("/complete-profile");
      } else if (data.status === 403) {
        setPasswordInput("");
        alert(data.message);
      }
    } catch (err) {}
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    loginRequestHandler();
  };

  return (
    <div className={classes.Container}>
      <div className={classes.LoginBox}>
        <div className={classes.Title}>
          <img
            src={GogosLogo}
            alt="/"
            className={classes.Logo}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <form className={classes.FormBox} onSubmit={onSubmitHandler}>
          {/* <Input
            title="Email"
            name="email"
            value={emailInput}
            onChange={inputChangeHandler}
            type="email"
            placeholder="Email"
          />
          <Input
            title="Password"
            name="password"
            value={passwordInput}
            onChange={inputChangeHandler}
            type="password"
            placeholder="Password"
          /> */}
          <input
            title="Email"
            name="email"
            value={emailInput}
            onChange={inputChangeHandler}
            type="email"
            placeholder="Email"
            className={classes.Input}
            onBlur={() => {
              const isEmail = validator.isEmail(emailInput);
              setEmailValid(isEmail ? "valid" : "invalid");
            }}
          />
          {emailValid === "invalid" ? (
            <p style={{ color: "red" }}>Email input is invalid</p>
          ) : null}
          <input
            title="Password"
            name="password"
            value={passwordInput}
            onChange={inputChangeHandler}
            type="password"
            placeholder="Password"
            className={classes.Input}
          />
          <div className={classes.extraInfo}>
            <div className={classes.rememberBox}>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => {
                  setRemember((prev) => !prev);
                }}
              />
              <div>Remember me</div>
            </div>
            <div
              className={classes.forgotPassword}
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot password?
            </div>
          </div>
          <button
            className={`${classes.LoginButton} ${
              emailValid === "valid" || emailValid === "untouched"
                ? classes.LoginButtonValid
                : ""
            }`}
            onClick={null}
          >
            Log In
          </button>
          <button
            className={`${classes.SignupButton}`}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Create account
          </button>
        </form>
        <div className={classes.SocialLoginContainer}>
          <div>login with</div>
          <SocialLoginBox remember={remember} />
        </div>
      </div>
    </div>
  );
};

export default Login;

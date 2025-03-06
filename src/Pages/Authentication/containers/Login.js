import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import SocialLoginBox from "../components/SocialLoginBox";
import Input from "../../../shared/UI/components/FormElements/Input";
import { AuthContext } from "../../../shared/context/auth-context";
import { ProfileContext } from "../../../shared/context/profile-context";

import { API_Login } from "../../../API";

import classes from "./Auth.module.css";
import Logo from "../../../shared/assets/icons/A-List_logo_rmbg.svg";
import GogosLogo from "../../../shared/assets/icons/GogosEdu_icon_text_logo.svg";

// const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [remember, setRemember] = useState(true);
  const [validated, setValidated] = useState(true);
  const auth = useContext(AuthContext);
  const profile = useContext(ProfileContext);
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
      });
      const data = await response.json();
      const authData = data.authData;
      if (data.status === 200) {
        auth.login(authData.accessToken);
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
          <img src={GogosLogo} alt="/" className={classes.Logo} />
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
          />
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
            <div className={classes.forgotPassword}>Forgot password?</div>
          </div>
          <button
            className={`${classes.LoginButton} ${
              validated ? classes.LoginButtonValid : ""
            }`}
            onClick={null}
          >
            Log In
          </button>
          <button
            className={`${classes.SignupButton}`}
            onClick={() => {
              navigate("/complete-profile");
            }}
          >
            Create account
          </button>
        </form>
        <div className={classes.SocialLoginContainer}>
          <div>login with</div>
          <SocialLoginBox />
        </div>
      </div>
    </div>
  );
};

export default Login;

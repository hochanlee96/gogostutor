import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import SocialLoginBox from "../components/SocialLoginBox";
import Input from "../../../shared/UI/components/FormElements/Input";
import { AuthContext } from "../../../shared/context/auth-context";
import { ProfileContext } from "../../../shared/context/profile-context";

import { API_Login } from "../../../API";

import classes from "./Auth.module.css";
import Logo from "../../../shared/assets/icons/A-List_logo_rmbg.svg";

// const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
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
      console.log("data: ", data);
      const authData = data.authData;
      if (data.status === 200) {
        auth.login(authData.accessToken);
        navigate("/dashboard");
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
          <img src={Logo} alt="/" className={classes.Logo} />
          <h3 style={{ marginBottom: 0 }}>Tutor Sign In</h3>
        </div>
        <form className={classes.FormBox} onSubmit={onSubmitHandler}>
          <Input
            title="Email"
            name="email"
            value={emailInput}
            onChange={inputChangeHandler}
            type="email"
          />
          <Input
            title="Password"
            name="password"
            value={passwordInput}
            onChange={inputChangeHandler}
            type="password"
          />
          <button className={classes.Button} onClick={null}>
            Log In
          </button>
          <hr />
        </form>
        <SocialLoginBox />

        <div className={classes.RedirectLine}>
          <p className={classes.RedirectMessage}>New to A-List?</p>
          <button
            className={classes.RedirectLink}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

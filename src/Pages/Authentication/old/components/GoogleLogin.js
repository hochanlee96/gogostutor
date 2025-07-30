import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";

import { AuthContext } from "../../../shared/context/auth-context";

import { API_GoogleLogin } from "../../../API";
import classes from "./SocialLoginBox.module.css";
import GoogleLogo from "../../../shared/assets/icons/google-logo.png";

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const GoogleLoginButton = ({ remember }) => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const LoginSuccessHandler = async (res) => {
    try {
      const response = await API_GoogleLogin({
        ...res,
        credential: res.credential,
        remember: remember,
      });
      const data = await response.json();
      const authData = data.authData;
      // const profileData = data.profileData;
      if (data.status === 200) {
        auth.login(authData.accessToken);
        localStorage.setItem("login", Date.now());
        authData.profileCompleted
          ? navigate("/dashboard")
          : navigate("/complete-profile");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      LoginSuccessHandler(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    // <GoogleLogin
    //   onSuccess={(res) => {
    //     console.log(res);
    //     LoginSuccessHandler(res);
    //   }}
    //   onError={(err) => {
    //     console.log(err);
    //   }}

    // />
    <div className={classes.button}>
      <img
        src={GoogleLogo}
        alt="/"
        className={classes.icon}
        onClick={() => login()}
      />
    </div>
  );
};

export default GoogleLoginButton;

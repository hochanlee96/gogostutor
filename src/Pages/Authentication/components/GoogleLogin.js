import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";

import { AuthContext } from "../../../shared/context/auth-context";
import { ProfileContext } from "../../../shared/context/profile-context";

import { API_GoogleLogin } from "../../../API";
import classes from "../containers/Auth.module.css";
import GoogleLogo from "../../../shared/assets/icons/google-logo.png";

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const GoogleLoginButton = () => {
  const auth = useContext(AuthContext);
  const profile = useContext(ProfileContext);
  const navigate = useNavigate();

  const LoginSuccessHandler = async (res) => {
    try {
      const response = await API_GoogleLogin({ credential: res.credential });
      const data = await response.json();
      console.log(data);
      const authData = data.authData;
      // const profileData = data.profileData;
      if (data.status === 200) {
        auth.login(authData.accessToken);
        // profile.setProfileData(profileData);
        navigate("/dashboard");
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
    onFailure: (err) => {
      console.log(err);
    },
  });

  return (
    // <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
    <GoogleLogin
      onSuccess={(res) => {
        console.log(res);
        LoginSuccessHandler(res);
      }}
      onError={(err) => {
        console.log("err");
        console.log(err);
      }}
      // type="icon"
    />
    /* <div className={classes.SocialLoginItem} onClick={login}>
        <img className={classes.SocialLogo} src={GoogleLogo} alt="/" />
        Login with Google
      </div> */
    // </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { API_FacebookLogin } from "../../../API";

import FacebookLogo from "../../../shared/assets/icons/facebook-logo.png";

import classes from "./SocialLoginBox.module.css";

const { REACT_APP_FACEBOOK_APP_ID } = process.env;

const FacebookLoginButton = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleFacebookCallback = async (res) => {
    if (res?.status === "unknown") {
      console.error("Sorry!", "Something went wrong with facebook Login.");
      return;
    } else {
      console.log(res);
      try {
        const response = await API_FacebookLogin({
          email: res.email,
          picture: res.picture.data.url,
          name: res.name,
        });
        const data = await response.json();
        console.log(data);
        const authData = data.authData;
        // const profileData = data.profileData;
        if (data.status === 200) {
          auth.login(authData.accessToken);
          // profile.setProfileData(profileData);
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Error in Facebook Login", err);
        return;
      }
    }
  };

  return (
    <FacebookLogin
      appId={REACT_APP_FACEBOOK_APP_ID}
      autoLoad={false}
      fields="name,email,picture"
      callback={handleFacebookCallback}
      render={(renderProps) => (
        <button className={classes.button} onClick={renderProps.onClick}>
          <img src={FacebookLogo} alt="Facebook" className={classes.icon} />
        </button>
      )}
    />
  );
};
export default FacebookLoginButton;

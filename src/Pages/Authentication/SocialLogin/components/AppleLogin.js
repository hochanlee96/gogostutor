import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppleLogin from "react-apple-login";

import { AuthContext } from "../../../../shared/context/auth-context";
import { API_AppleLogin } from "../../../../API";

import AppleLogo from "../../../../shared/assets/icons/apple.svg";
import classes from "./SocialLoginBox.module.css";

const { REACT_APP_STUDENT_URL, REACT_APP_APPLE_LOGIN_CLIENT_ID } = process.env;

const AppleLoginComponent = ({ remember }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const appleResponse = async (res) => {
    try {
      const response = await API_AppleLogin({ ...res, remember: remember });
      const data = await response.json();
      const authData = data.authData;
      if (data.status === 200) {
        auth.login(authData.accessToken, () => {
          navigate(authData.profileCompleted ? "/dashboard" : "/preference");
        });
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppleLogin
      clientId={REACT_APP_APPLE_LOGIN_CLIENT_ID}
      redirectURI={REACT_APP_STUDENT_URL}
      usePopup={true}
      //   callback={(this.appleResponse)} // Catch the response
      callback={appleResponse} // Catch the response
      scope="email name"
      responseMode="query"
      render={(
        renderProps //Custom Apple Sign in Button
      ) => (
        <button className={classes.button} onClick={renderProps.onClick}>
          <img src={AppleLogo} alt="Apple" />
          <div className={classes.SocialName}>Apple</div>
        </button>
      )}
    />
  );
};

export default AppleLoginComponent;

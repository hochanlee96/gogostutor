import { GoogleOAuthProvider } from "@react-oauth/google";
import CustomGoogleLogin from "./GoogleLogin";
import CustomFacebookLogin from "./FacebookLogin";

import AppleLogo from "../../../shared/assets/icons/apple-logo.png";

import classes from "./SocialLoginBox.module.css";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const SocialLoginBox = () => {
  return (
    <div className={classes.SocialLoginBox}>
      <div className={classes.SocialLoginItem}>
        <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
          <CustomGoogleLogin />
        </GoogleOAuthProvider>
      </div>
      <div className={classes.SocialLoginItem}>
        <CustomFacebookLogin />
      </div>
      <div className={classes.SocialLoginItem}>
        <img className={classes.SocialLogo} src={AppleLogo} alt="/" />
        Login with Apple
      </div>
    </div>
  );
};

export default SocialLoginBox;

import { GoogleOAuthProvider } from "@react-oauth/google";
import CustomGoogleLogin from "./GoogleLogin";
import CustomFacebookLogin from "./FacebookLogin";
import CustomAppleLogin from "./AppleLogin";
import CustomWechatLogin from "./WechatLogin";

import classes from "./SocialLoginBox.module.css";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const SocialLoginBox = ({ remember }) => {
  return (
    <div className={classes.SocialLoginBox}>
      <div className={classes.SocialLoginItem}>
        <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
          <CustomGoogleLogin remember={remember} />
        </GoogleOAuthProvider>
      </div>
      <div className={classes.SocialLoginItem}>
        <CustomFacebookLogin remember={remember} />
      </div>
      <div className={classes.SocialLoginItem}>
        <CustomAppleLogin remember={remember} />
      </div>
      <div className={classes.SocialLoginItem}>
        <CustomWechatLogin remember={remember} />
      </div>
    </div>
  );
};

export default SocialLoginBox;

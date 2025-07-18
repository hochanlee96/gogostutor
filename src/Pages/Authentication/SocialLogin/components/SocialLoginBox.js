import { GoogleOAuthProvider } from "@react-oauth/google";
import CustomGoogleLogin from "./GoogleLogin";
import CustomFacebookLogin from "./FacebookLogin";
import CustomAppleLogin from "./AppleLogin";
// import CustomWechatLogin from "./WechatLogin";

import classes from "./SocialLoginBox.module.css";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const SocialLoginBox = ({ remember }) => {
  return (
    <div className={classes.SocialLoginButtons}>
      <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
        <CustomGoogleLogin remember={remember} />
      </GoogleOAuthProvider>
      <CustomFacebookLogin remember={remember} />
      <CustomAppleLogin remember={remember} />
    </div>
  );
};

export default SocialLoginBox;

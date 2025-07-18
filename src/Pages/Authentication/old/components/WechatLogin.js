import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppleLogin from "react-apple-login";

import { AuthContext } from "../../../shared/context/auth-context";
import { API_AppleLogin } from "../../../API";

import WechatLogo from "../../../shared/assets/icons/wechat-logo.png";
import classes from "./SocialLoginBox.module.css";

const WechatLoginComponent = () => {
  return (
    <button className={classes.button}>
      <img src={WechatLogo} alt="Wechat" className={classes.icon} />
    </button>
  );
};

export default WechatLoginComponent;

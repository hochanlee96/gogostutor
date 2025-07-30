import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";

import { AuthContext } from "../../../../shared/context/auth-context";

import { API_GoogleLogin } from "../../../../API";
import classes from "./SocialLoginBox.module.css";
import GoogleLogo from "../../../../shared/assets/icons/google.svg";

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
      if (data.status === 200) {
        auth.login(authData.accessToken, () => {
          navigate(authData.profileCompleted ? "/dashboard" : "/preference");
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (res) => {
      // console.log(res);
      LoginSuccessHandler(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <button className={classes.button} onClick={login}>
      <img src={GoogleLogo} alt="/" />
      <div className={classes.SocialName}>Google</div>
    </button>
  );
};

export default GoogleLoginButton;

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { AuthContext } from "../../../shared/context/auth-context";

const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_LOGIN_DURATION } = process.env;

const GoogleLoginButton = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const LoginSuccessHandler = async (res) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutor/social-login",
        {
          method: "POST",
          body: JSON.stringify({ credential: res.credential }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      auth.login(
        data.tutorId,
        data.email,
        data.accessToken,
        data.refreshToken,
        new Date(new Date().getTime() + 1000 * REACT_APP_LOGIN_DURATION) // 웹사이트에 얼마나 로그인 상태로 남아있도록 할 것인지 (지금은 1시간. 나중에는 1d정도로 바꿔도 될듯)
      );
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={(res) => {
          LoginSuccessHandler(res);
        }}
        onFailure={(err) => {
          console.log(err);
        }}
        type="icon"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

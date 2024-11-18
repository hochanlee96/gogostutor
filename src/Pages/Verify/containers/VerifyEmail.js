import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

import {
  API_SendVerificationCode,
  API_CheckVerificationCode,
} from "../../../API";

import VerificationInput from "react-verification-input";

const VerifyEmail = () => {
  const [showDigitInput, setShowDigitInput] = useState(false);
  const [emailState, setEmailState] = useState("initial");
  const [digitInputs, setDigitInputs] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const sendVerificationCode = async () => {
    try {
      setEmailState("loading");
      setShowDigitInput(true);
      const response = await API_SendVerificationCode(
        auth.id,
        auth.accessToken
      );
      await response.json();
      setEmailState("6 digit verification code sent");
    } catch (err) {
      console.log(err);
    }
  };

  const checkVerificationCode = async (digits) => {
    try {
      const response = await API_CheckVerificationCode(
        auth.id,
        { verificationCode: digits },
        auth.accessToken
      );
      const data = await response.json();
      if (data.status === 200) {
        auth.verifyUser();
        navigate("/dashboard");
      } else {
        alert("Invalid verification code");
        setDigitInputs("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>This is a Test Page</h1>
      <div>
        {/* <button onClick={testEmailAPI}>Test Email API</button> */}
        Your email: {" " + auth.email}
        {emailState === "initial" ? null : <div>{emailState}</div>}
      </div>
      <div>
        {auth.isLoggedIn && !auth.verified && emailState !== "loading" ? (
          <button
            onClick={() => {
              sendVerificationCode();
              setShowDigitInput(true);
            }}
          >
            {emailState === "6 digit verification code sent"
              ? "Re-send email"
              : "Send verification email"}
          </button>
        ) : null}
        {showDigitInput ? (
          <VerificationInput
            value={digitInputs}
            onChange={(e) => {
              setDigitInputs(e);
            }}
            validChars="0-9"
            placeholder=""
            onComplete={(e) => {
              checkVerificationCode(e);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default VerifyEmail;

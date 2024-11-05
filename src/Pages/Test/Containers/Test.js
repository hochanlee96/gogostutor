import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

import VerificationInput from "react-verification-input";

const Test = () => {
  const [showDigitInput, setShowDigitInput] = useState(false);
  const [emailState, setEmailState] = useState("initial");
  const [digitInputs, setDigitInputs] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const sendVerificationEmail = async () => {
    try {
      setEmailState("loading");
      setShowDigitInput(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutor/send-verification-email",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      await response.json();
      setEmailState("6 digit verification code sent");
    } catch (err) {
      console.log(err);
    }
  };

  const checkVerificationCode = async (digits) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutor/check-verification-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
          body: JSON.stringify({ verificationCode: digits }),
        }
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
              sendVerificationEmail();
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

export default Test;

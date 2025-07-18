import { useState, useEffect, useCallback } from "react";
import classes from "./Create.module.css";
import io from "socket.io-client";

import VerifyEmail from "./VerifyEmail";
import SetPassword from "./SetPassword";
import Name from "./Name";
import DOB from "./DOB";
import Submit from "./Submit";

const { env } = process.env.REACT_APP_ENV;

const verificationSocket =
  env === "production"
    ? io(process.env.REACT_APP_TUTOR_URL, {
        path: "/verify",
        transports: ["websocket"],
        withCredentials: true,
      })
    : io(process.env.REACT_APP_VERIFICATION_SOCKET_URL);
const Password = ({
  setContentStep,
  form,
  setForm,
  verificationState,
  setVerificationState,
}) => {
  const [indexStep, setIndexStep] = useState(1);
  const [signupToken, setSignupToken] = useState("");

  const nullifyVerificationLink = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutors/verification-link",
        {
          method: "DELETE",
          body: JSON.stringify({
            email: form.email,
            role: "tutor",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          keepalive: true,
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, [form.email]);

  const createAccount = async (form) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutors/signup",
        {
          method: "POST",
          body: JSON.stringify({
            ...form,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      const authData = data.authData;
      if (data.status === 200) {
        setSignupToken(authData.accessToken);
        setIndexStep((prev) => prev + 1);
      } else if (data.status === 403) {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verificationSocket.on("emailVerified", (data) => {
      setVerificationState("verified");
      setIndexStep(2);
    });

    window.addEventListener("unload", nullifyVerificationLink);

    return () => {
      verificationSocket.off("emailVerified");
      window.removeEventListener("unload", nullifyVerificationLink);
      nullifyVerificationLink();
    };
  }, [setVerificationState, nullifyVerificationLink]);

  ////JSX

  let mainContent = (
    <VerifyEmail
      form={form}
      setForm={setForm}
      verificationState={verificationState}
      setVerificationState={setVerificationState}
      setContentStep={setContentStep}
      setIndexStep={setIndexStep}
      nullifyVerification={nullifyVerificationLink}
    />
  );
  if (indexStep === 2) {
    mainContent = (
      <SetPassword
        form={form}
        setForm={setForm}
        verificationState={verificationState}
        setVerificationState={setVerificationState}
        setContentStep={setContentStep}
        setIndexStep={setIndexStep}
        setSignupToken={setSignupToken}
        nullifyVerification={nullifyVerificationLink}
      />
    );
  } else if (indexStep === 3) {
    mainContent = (
      <Name
        form={form}
        setForm={setForm}
        setContentStep={setContentStep}
        setIndexStep={setIndexStep}
      />
    );
  } else if (indexStep === 4) {
    mainContent = (
      <DOB
        form={form}
        setForm={setForm}
        setContentStep={setContentStep}
        setIndexStep={setIndexStep}
        createAccount={createAccount}
      />
    );
  } else if (indexStep === 5) {
    mainContent = (
      <Submit
        form={form}
        verificationState={verificationState}
        signupToken={signupToken}
      />
    );
  }
  return (
    <div className={`${classes.Container}`}>
      <div className={classes.Description}>Sign up with email</div>
      {mainContent}
    </div>
  );
};

export default Password;

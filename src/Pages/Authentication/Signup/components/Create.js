import { useState, useEffect, useCallback } from "react";
import classes from "./Create.module.css";
import io from "socket.io-client";

import Create1 from "./Create1";
import Create2 from "./Create2";
import Create3 from "./Create3";

const { env } = process.env.REACT_APP_ENV;

const verificationSocket =
  env === "production"
    ? io(process.env.REACT_APP_STUDENT_URL, {
        path: "/verify",
        transports: ["websocket"],
        withCredentials: true,
      })
    : io(process.env.REACT_APP_VERIFICATION_SOCKET_URL);
const Password = ({
  language,
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
        process.env.REACT_APP_BACKEND_URL + "/students/verification-link",
        {
          method: "DELETE",
          body: JSON.stringify({
            email: form.email,
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
    <Create1
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
      <Create2
        form={form}
        setForm={setForm}
        verificationState={verificationState}
        setVerificationState={setVerificationState}
        setContentStep={setContentStep}
        setIndexStep={setIndexStep}
        setSignupToken={setSignupToken}
      />
    );
  } else if (indexStep === 3) {
    mainContent = (
      <Create3
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

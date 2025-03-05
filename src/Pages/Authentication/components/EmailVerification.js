import { useState, useEffect } from "react";

import classes from "../containers/CompleteProfile.module.css";

import io from "socket.io-client";

const socket = io(process.env.REACT_APP_VERIFICATION_SOCKET_URL);
const EmailVerification = ({ email, signupForm, setSignupForm }) => {
  const [sentEmail, setSentEmail] = useState("not sent");
  const [emailVerified, setEmailVerified] = useState(false);

  const sendVerificationEmail = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/tutors/send-verification`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.status === 200) {
        setSentEmail("sent");
        alert("Verification email sent successfully.");
      } else {
        alert("Failed to send verification email.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.on("emailVerified", (data) => {
      alert(`Email verified: ${data.email}`);
      setEmailVerified(true);
      setSignupForm((prev) => {
        return { ...prev, email: { ...prev.email, state: "valid" } };
      });
    });

    return () => {
      socket.off("emailVerified");
    };
  }, [setSignupForm]);
  return (
    <div>
      {sentEmail === "sent" ? (
        emailVerified ? (
          <div className={classes.SuccessMessage}>Email is verified</div>
        ) : (
          <div className={classes.NeutralMessage}>Sent verification email</div>
        )
      ) : sentEmail === "sending" ? (
        <div className={classes.NeutralMessage}>
          Sending verification email...
        </div>
      ) : signupForm.email.state === "valid" ? null : (
        <button
          className={`${classes.verifyButton} ${
            signupForm.email.state === "available"
              ? classes.verifyButtonActive
              : ""
          }`}
          // disabled={signupForm.email.state !== "available"}
          onClick={() => {
            setSentEmail("sending");
            sendVerificationEmail();
          }}
        >
          Send verification email
        </button>
      )}
    </div>
  );
};

export default EmailVerification;

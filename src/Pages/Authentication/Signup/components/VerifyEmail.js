import { useState, useEffect } from "react";
import Loading from "../../../../shared/components/Loading/Loading";
import classes from "./Create.module.css";

const emailResendTime = 30;
const VerifyEmail = ({
  form,
  setForm,
  verificationState,
  setVerificationState,
  setContentStep,
  nullifyVerification,
}) => {
  const [resent, setResent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(emailResendTime);
  const [isActive, setIsActive] = useState(false);

  const sendVerificationEmail = async () => {
    try {
      setVerificationState("resending");
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/tutors/send-verification`,
        {
          method: "POST",
          body: JSON.stringify({ email: form.email }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.status === 200) {
        setVerificationState("sent");
        setSecondsLeft(emailResendTime);
      } else {
        alert("Failed to send verification email.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let timer;
    if (secondsLeft > 0) {
      timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    } else {
      setIsActive(true);
    }
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const resendEmailHandler = () => {
    if (isActive) {
      sendVerificationEmail();
      setResent(true);
      setIsActive(false);
    }
  };

  return (
    <>
      <div className={classes.ContentBox}>
        <div className={classes.Index}>1 of 3</div>
        <div className={classes.Content}>
          <div className={classes.TextBox}>
            <div className={classes.HeadingText}>
              {resent ? "Email Resent!" : "Great, now let's verify your email"}
            </div>
            <div className={classes.Subtext}>
              <div>
                Email confirmation sent to <b>{form.email}</b>. Please click on
                link to verify
              </div>
            </div>
          </div>
          <div className={classes.ButtonBox}>
            <button
              className={classes.Button}
              onClick={resendEmailHandler}
              disabled={!isActive}
            >
              {verificationState === "resending" ? (
                <Loading />
              ) : (
                `Resend Email${secondsLeft ? ` (${secondsLeft}s)` : ""}`
              )}
            </button>
            {verificationState === "resending" ? (
              <div className={classes.Enter}>
                Resending verification email...
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={classes.NavButtons}>
        <button
          className={`${classes.NavButton} ${classes.NavButtonPrev}`}
          onClick={() => {
            nullifyVerification();
            setForm((prev) => {
              return { ...prev, email: "", password: "" };
            });
            setContentStep("Email");
          }}
        >
          Previous
        </button>

        <button
          className={`${classes.NavButton} ${classes.NavButtonExit}`}
          onClick={() => {
            nullifyVerification();
            setForm((prev) => {
              return { ...prev, email: "", password: "" };
            });
            setContentStep("Start");
          }}
        >
          Exit sign up
        </button>
      </div>
    </>
  );
};

export default VerifyEmail;

import classes from "./Start.module.css";

import SocialLoginBox from "../../SocialLogin/components/SocialLoginBox";
const Start = ({ language, setContentStep }) => {
  return (
    <>
      <div className={classes.ContentContainer}>
        <div className={classes.TextContainer}>
          <div className={classes.GetStartedText}>Get started</div>
          <div className={classes.GetStartedSubText}>
            Book tutors, track progress, and stay involved - all in one place.
          </div>
        </div>
        <div className={classes.LoginContainer}>
          <div className={classes.SocialLoginContainer}>
            <div className={classes.SocialLoginText}>Continue with</div>
            <SocialLoginBox />
          </div>
          <div className={classes.orText}>OR</div>
          <button
            className={classes.SignUpButton}
            onClick={() => {
              setContentStep("Email");
            }}
          >
            Sign up with email
          </button>
        </div>
      </div>
    </>
  );
};

export default Start;

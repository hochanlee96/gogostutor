import classes from "./Start.module.css";

import SocialLoginBox from "../../SocialLogin/components/SocialLoginBox";
const Start = ({ setContentStep }) => {
  return (
    <>
      <div className={classes.ContentContainer}>
        <div className={classes.TextContainer}>
          <div className={classes.GetStartedText}>Beocme a tutor</div>
          <div className={classes.GetStartedSubText}>
            Inspire students, grow your impact, and teach on your terms.
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

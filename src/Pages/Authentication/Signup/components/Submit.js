import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../../shared/context/auth-context";

import { ReactComponent as ArrowRight } from "../../../../shared/assets/icons/arrow-right.svg";
import classes from "./Create.module.css";

const Submit = ({ signupToken }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const navigateHandler = async (path) => {
    if (!signupToken) {
      alert("An error occurred. Please refresh the page.");
    } else {
      auth.login(signupToken, () => {
        navigate(path);
      });
    }
  };
  return (
    <>
      <div className={classes.ContentBox}>
        <div className={classes.Content}>
          <div className={classes.HeadingText}>
            <b>Profile Setup Complete!</b>
          </div>
          <div className={classes.Subtext}>
            Now let's help you find the right Subject Test(s) so you can start
            earning!
          </div>
          <div className={classes.ButtonBox}>
            <button
              className={classes.Button}
              onClick={() => {
                navigateHandler("/preference");
              }}
            >
              Set Subjects Now
              <ArrowRight
                className={classes.ButtonArrow}
                style={{ fill: "var(--grayscale-inline_inverse)" }}
              />
            </button>
            <button
              className={`${classes.Button} ${classes.ButtonDark}`}
              onClick={() => {
                navigateHandler("/dashboard");
              }}
            >
              Go to Dashboard
              <ArrowRight
                className={classes.ButtonIcon}
                style={{ fill: "var(--grayscale-inline_default)" }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={classes.NavButtons}>
        <button className={`${classes.NavButton}`} disabled={true}>
          Previous
        </button>
        <button
          className={`${classes.NavButton} ${classes.NavButtonNext}`}
          onClick={() => {
            navigateHandler("/dashboard");
          }}
        >
          Go to dashboard
          <ArrowRight className={classes.BlueArrow} />
        </button>
      </div>
    </>
  );
};

export default Submit;

import { useNavigate } from "react-router-dom";

import { ReactComponent as ArrowRight } from "../../../../shared/assets/icons/arrow-right.svg";
import classes from "./NavButtons.module.css";

const { REACT_APP_STUDENT_URL } = process.env;

const NavButtons = ({ login }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.ButtonContainer}>
      <a className={classes.StudentButton} href={REACT_APP_STUDENT_URL}>
        <div className={classes.StudentText}>Are you a student?</div>
        <ArrowRight
          className={classes.Icon}
          style={{ fill: "var(--brand-cta)" }}
        />
      </a>
      <button
        className={classes.SignupButton}
        onClick={() => {
          if (login) {
            navigate("/signup");
          } else {
            navigate("/login");
          }
        }}
      >
        <div className={classes.SignupText}>
          {login ? "Don't have an account" : "Sign in instead"}
        </div>
        <ArrowRight
          className={classes.Icon}
          style={{ fill: "var(--grayscale-inline_default)" }}
        />
      </button>
    </div>
  );
};

export default NavButtons;

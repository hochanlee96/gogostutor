import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import { UserContext } from "./shared/context/user-context";

import LogoLetters from "./shared/assets/icons/gogos-letter-logo-black.svg";
import Logo from "./shared/assets/icons/gogos-logo.svg";
import classes from "./Navigation.module.css";

const { REACT_APP_STUDENT_URL } = process.env;

const Navigation = ({ isSignedIn }) => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className={classes.headerContainer}>
      <div className={classes.logoAndNavContainer}>
        <div
          tabIndex="0"
          className={classes.logoContainer}
          onClick={() => {
            navigate("/");
          }}
        >
          <img className={classes.logoIcon} alt="" src={Logo} />
          <img alt="" src={LogoLetters} />
        </div>
        <div className={classes.navContainer}>
          <div
            tabIndex="0"
            className={classes.navButton}
            onClick={() => {
              navigate("/tutors");
            }}
          >
            Find a Tutor
          </div>
          <div
            tabIndex="0"
            className={classes.navButton}
            onClick={() => {
              navigate("/resources");
            }}
          >
            Resources
          </div>
        </div>
      </div>
      <div className={classes.actionsContainer}>
        <a
          className={`${classes.navButton} ${classes.tutorButton}`}
          href={REACT_APP_STUDENT_URL}
          tabIndex="0"
        >
          Are you a student?
        </a>
        {!isSignedIn ? (
          <div
            tabIndex="0"
            className={classes.navButton}
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </div>
        ) : null}
        {!isSignedIn ? (
          <div
            tabIndex="0"
            className={`${classes.navButton} ${classes.startButton}`}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Get started
          </div>
        ) : null}
        {isSignedIn ? (
          <div
            tabIndex="0"
            onClick={() => {
              navigate("/dashboard");
            }}
            className={classes.navButton}
          >
            {user && user.profile && user.profile.firstName
              ? user.profile.firstName
              : "User"}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navigation;

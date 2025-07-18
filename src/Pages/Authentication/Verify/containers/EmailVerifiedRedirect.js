import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import LogoIcon from "../../../../shared/assets/icons/gogosedu-color-icon.svg";
import GogosLogo from "../../../../shared/assets/icons/gogos-edu-text-logo-black.svg";
import classes from "./EmailVerifiedRedirect.module.css";

const EmailVerifiedRedirect = () => {
  const [count, setCount] = useState(5);
  const { status } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (count <= 0) {
      window.close();
      return;
    }
    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);
  return (
    <div className={classes.container}>
      <div
        className={classes.logoContainer}
        onClick={() => {
          navigate("/");
        }}
      >
        <img alt="Gogos" src={LogoIcon} />
        <img src={GogosLogo} alt="Gogos Edu" />
      </div>
      <div className={`${classes.textBox}`}>
        {status === "success" ? (
          <>
            <div className={classes.mainText}>
              Your email address is verified!
            </div>
            <div classname={classes.subText}>
              Your email address is verified!
            </div>
          </>
        ) : (
          <>
            <div className={classes.errorText}>
              The verification link is{" "}
              <span style={{ color: "var(--danger-danger)" }}>invalid.</span>
            </div>
            <div classname={classes.subText}>Please try again.</div>
          </>
        )}
      </div>

      <p className={classes.closeText}>
        This window will close in <b> {count} seconds</b>
      </p>
    </div>
  );
};

export default EmailVerifiedRedirect;

//To Do
//1. What should happen if the user reopens the used link?

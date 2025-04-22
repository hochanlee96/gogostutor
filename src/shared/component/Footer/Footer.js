import React from "react";
import classes from "./Footer.module.css";
import logo from "../../assets/icons/gogosedu_black.png";

const Footer = () => {
  return (
    <footer className={classes.wrapper}>
      <div className={classes.inner}>
        <div className={classes.logoSection}>
          <img src={logo} alt="Gogos Edu logo" className={classes.logo} />
        </div>
        <div className={classes.linksSection}>
          <div className={classes.column}>
            <h4>About</h4>
            <p>Courses</p>
            <p>Blog</p>
            <p>Careers</p>
            <p>Press</p>
          </div>
          <div className={classes.column}>
            <h4>Join</h4>
            <p>Gogos Edu</p>
            <p>Gogos Edu Tutor</p>
          </div>
          <div className={classes.column}>
            <h4>Useful Links</h4>
            <p>Gogos Edu Help Center</p>
            <p>Gogos Edu (iOS)</p>
            <p>Gogos Edu (Android)</p>
            <p>Gogos Edu Tutor (iOS)</p>
            <p>Gogos Edu Tutor (Android)</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

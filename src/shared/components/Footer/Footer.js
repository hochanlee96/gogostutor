import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Footer.module.css";
import logo from "../../../assets/icons/gogosedu_black.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className={classes.wrapper}>
      <div className={classes.inner}>
        <div className={classes.logoSection}>
          <img src={logo} alt="Gogos Edu logo" className={classes.logo} />
        </div>
        <div className={classes.linksSection}>
          <div className={classes.column}>
            <h4>Company</h4>
            <p>About Us</p>
            <p>Careers</p>
            <p>Press</p>
            <p>Blog</p>
            <p>Contact</p>
          </div>
          <div className={classes.column}>
            <h4 className={classes.link}>
              <a href={process.env.REACT_APP_STUDENT_URL}>Gogos Edu</a>
            </h4>
            <p
              onClick={() => {
                navigate("/signup");
              }}
            >
              Become a tutor
            </p>
            <p>FAQ</p>
            <p>Help Center</p>
            <p>Newsletters</p>
          </div>

          <div className={classes.column}>
            <h4>Legal</h4>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
            <p>Security</p>
          </div>
          <div className={classes.column}>
            <h4>Follow Us</h4>
            <p>Twitter</p>
            <p>LinkedIn</p>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>GitHub</p>
          </div>
        </div>
      </div>
      <div className={classes.copyright}>
        © 2025, Gogos Edu: Go fast, Go flexible with S-rank tutors
      </div>
    </footer>
  );
};

export default Footer;

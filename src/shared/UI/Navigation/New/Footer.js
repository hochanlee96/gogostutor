import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        {/* Left Section */}
        <div className={classes.brand}>
          <h2 className={classes.logo}>Gogos Edu</h2>
          <ul className={classes.socialLinks}>
            <li>
              <a href="#" className={classes.link}>
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className={classes.link}>
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className={classes.link}>
                Youtube
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className={classes.linksContainer}>
          <div className={classes.linksGroup}>
            <h3 className={classes.heading}>About</h3>
            <ul className={classes.links}>
              <li>
                <a href="#" className={classes.link}>
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className={classes.link}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className={classes.link}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className={classes.link}>
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div className={classes.linksGroup}>
            <h3 className={classes.heading}>Join</h3>
            <ul className={classes.links}>
              <li>
                <a href="#" className={classes.link}>
                  Gogos Edu
                </a>
              </li>
              <li>
                <a href="#" className={classes.link}>
                  Gogos Edu Tutor
                </a>
              </li>
            </ul>
          </div>
          <div className={classes.linksGroup}>
            <h3 className={classes.heading}>Useful Links</h3>
            <ul className={classes.links}>
              <li>
                <a href="#" className={classes.link}>
                  Gogos Edu Help Center
                </a>
              </li>
              <li>
                <a href="#" className={classes.link}>
                  Gogos Edu (iOS)
                </a>
              </li>
              <li>
                <a href="#" className={classes.link}>
                  Gogos Edu Tutor (iOS)
                </a>
              </li>
              <li>
                <a href="#" className={classes.link}>
                  Gogos Edu Tutor (Android)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

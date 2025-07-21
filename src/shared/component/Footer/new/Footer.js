import React from "react";
import classes from "./Footer.module.css";

import Instagram from "../../../../shared/assets/icons/instagram.svg";
import LinkedIn from "../../../../shared/assets/icons/linkedin.svg";
import Facebook from "../../../../shared/assets/icons/facebook.svg";
import Language from "../../../../shared/assets/icons/globe.svg";
import DropDown from "../../../../shared/assets/icons/chevron-down.svg";

const Footer = () => {
  return (
    <footer>
      <div className={classes.inner}>
        <div className={classes.leftSection}>
          <div className={classes.logoAndSocials}>
            <div className={classes.gogosText}>Gogos</div>
            <div className={classes.socials}>
              <img
                className={classes.socialLogos}
                src={LinkedIn}
                alt="linkedin logo"
              />
              <img
                className={classes.socialLogos}
                src={Facebook}
                alt="facebook logo"
              />
              <img
                className={classes.socialLogos}
                src={Instagram}
                alt="instagram logo"
              />
            </div>
          </div>
          <div className={classes.languageButton}>
            <img alt="langauge icon" src={Language} />
            <div>English</div>
            <img
              alt="language dropdown"
              className={classes.Icon}
              src={DropDown}
            />
          </div>
        </div>
        <div className={`${classes.rightSection} ${classes.rightSectionText}`}>
          <div className={classes.aboutContainer}>
            <div>About</div>
            <div className={classes.subContainer}>
              <div>Courses</div>
              <div>Blog</div>
              <div>Careers</div>
              <div>Press</div>
            </div>
          </div>
          <div className={classes.joinContainer}>
            <div>Join</div>
            <div className={classes.subContainer}>
              <div>Gogos Edu</div>
              <div>Gogos Edu Tutor</div>
            </div>
          </div>
          <div className={classes.linksContainer}>
            <div>Links</div>
            <div className={classes.subContainer}>
              <div>Gogos Edu Help Center</div>
              <div>Gogos Edu (iOS)</div>
              <div>Gogos Edu (Android)</div>
              <div>Gogos Edu Tutor (iOS)</div>
              <div>Gogos Edu Tutor (Android)</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

//TODO: link all the links and socials, language toggle

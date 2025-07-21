import React from "react";
import classes from "./Hero.module.css";

import TutorColumnOne from "../../../../shared/assets/images/hero-column-1.svg";

import TutorColumnTwo from "../../../../shared/assets/images/hero-column-2.svg";
import TutorColumnThree from "../../../../shared/assets/images/hero-column-3.svg";
import TutorColumnFour from "../../../../shared/assets/images/hero-column-4.svg";

const HeroSection = () => {
  return (
    <div className={classes.sectionContainer}>
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <div className={classes.textContainerTop}>
            <div className={classes.title}>
              Accepting Applications for Online Tutors!
            </div>
            <div className={classes.subText}>
              Access thousands of students with flexible scheduling!
            </div>
          </div>
          <div className={classes.containerBottom}>
            <button className={`${classes.button} ${classes.tutorButton}`}>
              <div className={classes.buttonText}>Become a Tutor</div>
            </button>
            <button className={`${classes.button} ${classes.learnMoreButton}`}>
              <div className={`${classes.buttonText} ${classes.learnMoreText}`}>
                Learn More
              </div>
            </button>
          </div>
        </div>
        <div className={classes.rightSideContainer}>
          <div className={classes.imageGroup}>
            <img src={TutorColumnOne} alt="Hero tutor 1" />
            <img src={TutorColumnTwo} alt="Hero tutor 2" />
            <img src={TutorColumnThree} alt="Hero tutor 3" />
            <img src={TutorColumnFour} alt="Hero tutor 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import React from "react";
import classes from "./College.module.css";
import placeholderImage from "../assets/college.jpeg";

const College = () => {
  return (
    <section className={classes.container}>
      <div className={classes.banner}>
        <img
          src={placeholderImage}
          alt="College application"
          className={classes.bannerImage}
        />
        <div className={classes.bannerText}>
          <span className={classes.subtitle}>Coming soon</span>
          <h2 className={classes.title}>College application</h2>
          <p className={classes.description}>
            Apply to all of your top choices with Gogos Edu. Get accepted to
            your dream school.
          </p>
          <a href="/" className={classes.learnMore}>
            Learn More &gt;
          </a>
        </div>
      </div>
    </section>
  );
};

export default College;

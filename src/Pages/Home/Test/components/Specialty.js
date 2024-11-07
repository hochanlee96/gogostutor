import React from "react";
import classes from "./Specialty.module.css";
import placeholderImage from "../assets/TitleImage2.svg"; // Replace with actual images as needed

const LearningDesignSection = () => {
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <span className={classes.label}>What makes Gogos edu special</span>
        <h2 className={classes.title}>Design your learning</h2>
        <p className={classes.quote}>
          “Teachings of the great explorer of truth, the master-builder of human
          happiness.”
        </p>
        <a href="/" className={classes.learnMore}>
          Learn More &gt;
        </a>
      </div>
      <div className={classes.cardContainer}>
        <div className={classes.card}>
          <p className={classes.cardLabel}>Learn anything in one platform</p>
          <h3 className={classes.cardTitle}>Learn fast and easy</h3>
          <img
            src={placeholderImage}
            alt="Learn fast and easy"
            className={classes.cardImage}
          />
        </div>
        <div className={classes.card}>
          <p className={classes.cardLabel}>Customize your classes</p>
          <h3 className={classes.cardTitle}>Flexible scheduling</h3>
          <img
            src={placeholderImage}
            alt="Flexible scheduling"
            className={classes.cardImage}
          />
        </div>
        <div className={classes.card}>
          <p className={classes.cardLabel}>1:1 tutoring platform</p>
          <h3 className={classes.cardTitle}>Selective tutors pool</h3>
          <img
            src={placeholderImage}
            alt="Selective tutors pool"
            className={classes.cardImage}
          />
        </div>
      </div>
    </section>
  );
};

export default LearningDesignSection;

import React from "react";
import classes from "./Journey.module.css";
import placeholderImage from "../assets/journey.jpeg";

const Journey = () => {
  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <span className={classes.subtitle}>700+ students take Gogos Edu</span>
        <h2 className={classes.title}>Start your journey here</h2>
      </header>
      <div className={classes.content}>
        <div className={classes.instructions}>
          <div className={classes.step}>
            <h3 className={classes.stepTitle}>1. Sign up</h3>
            <p className={classes.stepText}>
              Sign up by clicking the icon at the top right of this page. Your
              account will be made.
            </p>
          </div>
          <div className={classes.step}>
            <h3 className={classes.stepTitle}>
              2. Fill in the application for desired subjects
            </h3>
            <p className={classes.stepText}>
              Once you sign up, you will be asked to submit details for subjects
              you're interested in.
            </p>
          </div>
          <div className={classes.step}>
            <h3 className={classes.stepTitle}>3. Start tutoring students!</h3>
            <p className={classes.stepText}>
              Once approved, your profile will be visible to students.
            </p>
          </div>
          <button className={classes.joinButton}>Join Gogos</button>
        </div>
        <div className={classes.imageSection}>
          <img
            src={placeholderImage}
            alt="Student Journey"
            className={classes.image}
          />
        </div>
      </div>
    </section>
  );
};

export default Journey;

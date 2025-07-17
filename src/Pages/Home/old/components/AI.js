import React from "react";
import classes from "./AI.module.css";
import studentImage from "../assets/student_image.png";
import aiIcon from "../assets/AI_image.png";

const AI = () => {
  return (
    <section className={classes.wrapper}>
      <p className={classes.subheading}>Gets help with AI</p>
      <h2 className={classes.heading}>
        AI Powered Recommendation <br /> vs Manual Selections
      </h2>

      <div className={classes.content}>
        <div className={classes.imageWrapper}>
          <img
            src={studentImage}
            alt="Student"
            className={classes.studentImage}
          />
          <div className={classes.overlay}>
            <img src={aiIcon} alt="AI Icon" className={classes.aiIcon} />
            <div className={classes.message}>Your learning has improved!</div>
            <div className={classes.message}>
              This is the summary of the class yesterday :)
            </div>
          </div>
        </div>

        <div className={classes.textBox}>
          <h3 className={classes.label}>AI Tool</h3>
          <p className={classes.description}>
            we recommend you the list of tutors based on your needs, using our
            AI tech. You can also manually browse through our massive pool of
            tutors.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AI;

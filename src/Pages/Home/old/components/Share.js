import React from "react";
import classes from "./Share.module.css";

const Share = () => {
  return (
    <div className={classes.shareWrapper}>
      <h2 className={classes.headline}>
        Share your expertise! Reach thousands of students while enjoying a
        flexible schedule.
      </h2>
      <p className={classes.paragraph}>
        Joining Gogos Edu as a tutor offers flexibility in setting your own
        schedule and connecting with a wide pool of 6-12th grade students
        seeking your expertise. The platform’s user-friendly interface
        simplifies session management, allowing you to focus on teaching while
        also providing opportunities for professional growth.
      </p>
      <p className={classes.paragraph}>
        As Gogos Edu expands, you’ll have the chance to explore new
        opportunities like group classes, making it an ideal platform for
        educators looking to make a meaningful impact.
      </p>
      <h3 className={classes.callToAction}>Apply Here!</h3>
      <button className={classes.button}>Sign Up</button>
    </div>
  );
};

export default Share;

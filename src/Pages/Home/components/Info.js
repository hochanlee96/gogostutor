import React from "react";
import classes from "./Info.module.css";

const Info = () => {
  return (
    <div className={classes.infoWrapper}>
      <section className={classes.section}>
        <h2 className={classes.title}>About Gogos Edu</h2>
        <p className={classes.text}>
          Gogos Edu is an online tutoring platform that instantly connects{" "}
          <strong>6-12th grade students</strong> with highly qualified tutors,
          allowing students to easily browse and book sessions based on their
          specific needs, such as subject, time, and grade level.
        </p>
      </section>

      <section className={classes.section}>
        <h2 className={classes.title}>How does Gogos Edu work?</h2>
        <p className={classes.text}>
          Thousands of students in need will join our platform on launch day.
          Before this, tutors will set up their profile pages by listing their
          available subjects, dates, and times. Students will then be able to
          browse through tutor profiles and book sessions based on the tutors'
          availability, displayed in a calendar format.
        </p>
        <p className={classes.text}>
          Tutors and students will have online sessions at the scheduled times.
        </p>
      </section>

      <section className={classes.section}>
        <h2 className={classes.title}>Simple 4 Steps for Our Tutors</h2>
        <p className={classes.text}>
          For both students and tutors, we aim to make the process as simple and
          intuitive as possible.{" "}
          <strong>
            If you're interested, just follow the four steps below!
          </strong>
        </p>
      </section>
    </div>
  );
};

export default Info;

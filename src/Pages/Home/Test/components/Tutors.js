import React from "react";
import classes from "./Tutors.module.css";
import placeholderImage from "../assets/TitleImage.svg";

const Tutors = () => {
  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <span className={classes.subtitle}>
          Teachings from all around the world
        </span>
        <h2 className={classes.title}>Meet top tutors</h2>
      </header>
      <div className={classes.tutorsList}>
        {Array(3)
          .fill()
          .map((_, index) => (
            <div key={index} className={classes.tutorCard}>
              <img
                src={placeholderImage}
                alt="Tutor"
                className={classes.tutorImage}
              />
              <div className={classes.tutorInfo}>
                <h3 className={classes.tutorName}>Tracy D. Wright</h3>
                <p className={classes.tutorDetail}>Certified Teacher</p>
                <button className={classes.joinButton}>Join</button>
                <p className={classes.bio}>
                  Tracy has over 10 years of experience and is known for making
                  classes engaging.
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Tutors;

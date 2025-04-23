import React from "react";
import classes from "./Hero.module.css";

const HeroSection = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.content}>
        <h1>Accepting Applications for Online Tutors!</h1>
        <p>
          Get paid between $31–$50/hr and access a large pool of students.
          Flexible scheduling available!
        </p>
        <a href="#apply" className={classes.cta}>
          Apply Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

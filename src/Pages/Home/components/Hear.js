import React from "react";
import classes from "./Hear.module.css";

import sampleStudent from "../assets/sample_student.jpeg";

const reviewData = [
  {
    fullname: "Finlay Kirk",
    grade: "12th grade",
    country: "Canada",
    review:
      "Teachings of the great explore of truth, the master-builder of human happiness.",
    imageURL: "",
  },
  {
    fullname: "Finlay Kirk",
    grade: "12th grade",
    country: "Canada",
    review:
      "Teachings of the great explore of truth, the master-builder of human happiness.",
    imageURL: "",
  },
  {
    fullname: "Finlay Kirk",
    grade: "12th grade",
    country: "Canada",
    review:
      "Teachings of the great explore of truth, the master-builder of human happiness.",
    imageURL: "",
  },
  {
    fullname: "Finlay Kirk",
    grade: "12th grade",
    country: "Canada",
    review:
      "Teachings of the great explore of truth, the master-builder of human happiness.",
    imageURL: "",
  },
];

const TestimonialCard = ({ fullname, grade, country, review, imageURL }) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardHeader}>
        {/* <img src={imageURL} alt={fullname} className={classes.avatar} /> */}
        <img src={sampleStudent} alt={fullname} className={classes.avatar} />
        <div className={classes.meta}>
          <h4 className={classes.name}>{fullname}</h4>
          <p className={classes.sub}>
            {grade}, {country}
          </p>
        </div>
      </div>
      <p className={classes.review}>“{review}”</p>
    </div>
  );
};

const Hear = () => {
  return (
    <section className={classes.wrapper}>
      <div className={classes.header}>
        <p className={classes.subheading}>Hear from students</p>
        <h2 className={classes.quote}>
          “The easiest, yet the most
          <br />
          <span className={classes.highlight}>
            professional online tutoring
          </span>
          <br />
          to nail your academic goals”
        </h2>
      </div>

      <div className={classes.cards}>
        {reviewData.map((data, index) => {
          return (
            <TestimonialCard
              key={index}
              fullname={data.fullname}
              grade={data.grade}
              country={data.country}
              review={data.review}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Hear;

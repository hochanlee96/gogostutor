import React from "react";
import classes from "./SampleTutors.module.css";
import { FaStar } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

import SampleTutorImage from "../assets/sample_tutor.jpeg";

const tutorData = [
  {
    fullname: "Tiffany Weng",
    rating: "4.9",
    country: "Sweden",
    subjects: ["AP Chemistry", "AP Economics"],
    imageURL: "",
  },
  {
    fullname: "Tiffany Weng",
    rating: "4.9",
    country: "Sweden",
    subjects: ["AP Chemistry", "AP Economics"],
    imageURL: "",
  },
  {
    fullname: "Tiffany Weng",
    rating: "4.9",
    country: "Sweden",
    subjects: ["AP Chemistry", "AP Economics"],
    imageURL: "",
  },
  {
    fullname: "Tiffany Weng",
    rating: "4.9",
    country: "Sweden",
    subjects: ["AP Chemistry", "AP Economics"],
    imageURL: "",
  },
];

const TutorCard = ({ fullname, rating, country, subjects, imageURL }) => {
  return (
    <div className={classes.tutorCard__card}>
      <div className={classes.tutorCard__imageContainer}>
        <img
          src={SampleTutorImage}
          alt={fullname}
          className={classes.tutorCard__mainImage}
        />
        {/* <div className={classes.tutorCard__bookmark}>
          <CiBookmark />
        </div> */}
      </div>

      <div className={classes.tutorCard__tags}>
        {subjects &&
          subjects.map((subj, index) => {
            return (
              <span key={index} className={classes.tutorCard__tag}>
                {subj}
              </span>
            );
          })}
      </div>

      <div className={classes.tutorCard__profile}>
        <img
          src={SampleTutorImage}
          alt={`${fullname} avatar`}
          className={classes.tutorCard__avatar}
        />
        <div>
          <p className={classes.tutorCard__name}>{fullname}</p>
          <div className={classes.tutorCard__meta}>
            <FaStar className={classes.tutorCard__star} />
            <span className={classes.tutorCard__rating}>{rating}</span>
            <img
              className={classes.fi}
              alt="United States"
              src="https://purecatamphetamine.github.io/country-flag-icons/3x2/SE.svg"
            />
            <span className={classes.tutorCard__country}>{country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const SampleTutors = () => {
  return (
    <section className={classes.wrapper}>
      <p className={classes.subheading}>Selective pool of tutors</p>
      <h2 className={classes.title}>
        Get an Instant Access to Thousands of
        <br />
        <span className={classes.highlight}>highly qualified tutors</span>{" "}
        across various subjects!
      </h2>

      <div className={classes.cardGrid}>
        {tutorData.map((data, index) => {
          return (
            <TutorCard
              fullname={data.fullname}
              rating={data.rating}
              country={data.country}
              subjects={data.subjects}
              imageURL={SampleTutorImage}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SampleTutors;

import React from "react";
import classes from "./Benefits.module.css";

const Benefits = () => {
  const benefits = [
    {
      title: "Wide Reach of Students",
      text: "Connect with a large pool of 6-12th grade students seeking tutoring services across various subjects.",
    },
    {
      title: "Flexible Scheduling",
      text: "Set your own availability for tutoring sessions, making it easy to balance with other commitments.",
    },
    {
      title: "Subject Specialization",
      text: "Highlight your expertise in specific subjects, attracting students who need help in your area of specialization.",
    },
    {
      title: "Streamlined Booking System",
      text: "Enjoy a hassle-free booking process where students can easily find and schedule sessions with you based on your availability.",
    },
    {
      title: "Professional Growth",
      text: "Enhance your professional profile by gaining experience and building a reputation as a qualified tutor within an organized platform.",
    },
    {
      title: "Competitive Earnings",
      text: "Earn a competitive income with flexible rates that reflect your experience and expertise.",
    },
    {
      title: "Supportive Platform",
      text: "Benefit from a user-friendly platform with tools designed to help you manage your tutoring sessions efficiently.",
    },
    {
      title: "Potential for Opportunities",
      text: "We are a startup with many other services planned for the future. Be among the first to take advantage of future opportunities like group classes, VOD tutoring, and more as Gogos Edu expands its services.",
    },
  ];

  return (
    <div className={classes.benefitsWrapper}>
      <h2 className={classes.header}>
        Benefits for Tutors, working with Gogos Edu
      </h2>
      <div className={classes.benefitsGrid}>
        {benefits.map((benefit, index) => (
          <div className={classes.benefitCard} key={index}>
            <div className={classes.imagePlaceholder}></div>
            <h3 className={classes.title}>{benefit.title}</h3>
            <p className={classes.text}>{benefit.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;

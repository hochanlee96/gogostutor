import React from "react";
import classes from "./How.module.css";

import img1 from "../assets/how_image_1.png";
import img2 from "../assets/how_image_2.png";
import img3 from "../assets/how_image_3.png";
import img4 from "../assets/how_image_4.png";

const steps = [
  {
    image: img1,
    title: "1. Find from the thousands of highly tutor that’s right for you",
    text: `Whether the student is trying tutoring for the first time or had a bad experience elsewhere, Gogos Edu helps pair students with tutors that meet their needs:
You can not only filter by your subject, but also by tutor’s languages, areas of interest, and teaching styles to ensure a great fit!`,
  },
  {
    image: img2,
    title: "2. Check tutor’s available time and book!",
    text: `Have you find the perfect tutor? Simply pick a time and book!
You will also be able to chat with tutor and describe your specific needs before class.`,
  },
  {
    image: img3,
    title: "3. Join online 1:1 Class",
    text: `When the appointed time comes, you will receive notification via system and your email. Simply click join and begin you 1:1 session with your tutor!`,
  },
  {
    image: img4,
    title: "4. All managed conveniently in our system",
    text: `You can browse, book, manage, booking, track progress within our system.
Also enjoy convenient features such as automated summary powered by AI, recorded class, chat system with tutor, and more.`,
  },
];

const How = () => {
  return (
    <section className={classes.wrapper}>
      <h2 className={classes.title}>How does Gogos Edu work?</h2>
      <div className={classes.steps}>
        {steps.map((step, index) => (
          <div key={index} className={classes.step}>
            <img
              src={step.image}
              alt={`Step ${index + 1}`}
              className={classes.image}
            />
            <div className={classes.text}>
              <h3 className={classes.stepTitle}>{step.title}</h3>
              {step.text.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default How;

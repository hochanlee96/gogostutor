import React from "react";
import classes from "./Credits.module.css";

const creditOptions = [
  {
    title: "30 Credits",
    sessions: [
      "3 sessions of regular classes",
      "2 sessions of AP or Test Prep",
    ],
    price: "$57/class",
  },
  {
    title: "60 Credits",
    sessions: [
      "6 sessions of regular classes",
      "4 sessions of AP or Test Prep",
    ],
    price: "$57/class",
  },
  {
    title: "120 Credits",
    sessions: [
      "12 sessions of regular classes",
      "8 sessions of AP or Test Prep",
    ],
    price: "$57/class",
  },
];

const Credits = () => {
  return (
    <section className={classes.wrapper}>
      <h2 className={classes.title}>“No pressure, start at your own pace.”</h2>
      <p className={classes.subtitle}>
        Buy Bundles and Save! <br />
        Make your class as low as $49 per session.
      </p>

      <div className={classes.cards}>
        {creditOptions.map((option, index) => (
          <div key={index} className={classes.card}>
            <h3 className={classes.cardTitle}>{option.title}</h3>
            <p className={classes.small}>You can take:</p>
            <p>{option.sessions[0]}</p>
            <p>Or</p>
            <p>{option.sessions[1]}</p>
            <p className={classes.price}>{option.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Credits;

import React from "react";
import classes from "./Conclusion.module.css";

const Conclusion = () => {
  return (
    <section className={classes.wrapper}>
      <h2 className={classes.title}>Fast, Flexible, Professional</h2>
      <p className={classes.text}>
        No more complicated steps back and forth – get matched fast and start
        learning right away!
      </p>
      <p className={classes.text}>Customer Satisfaction 98.8%</p>
      <p className={classes.text}>“No pressure, start at your own pace”</p>
      <button className={classes.button}>Get Started</button>
    </section>
  );
};

export default Conclusion;

import React from "react";
import classes from "./Events.module.css";

const Events = () => {
  return (
    <div className={classes.Container}>
      <div style={{ fontSize: "22px", fontWeight: "700" }}>Gogos News</div>
      <div className={classes.eventsBox}>News</div>
    </div>
  );
};

export default Events;

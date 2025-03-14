import React from "react";
import classes from "./News.module.css";

const News = () => {
  return (
    <div className={classes.Container}>
      <div style={{ fontSize: "22px", fontWeight: "700" }}>Gogos News</div>
      <div className={classes.newsBox}>News</div>
    </div>
  );
};

export default News;

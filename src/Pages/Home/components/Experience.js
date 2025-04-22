import React from "react";
import classes from "./Experience.module.css";

const Experience = () => {
  return (
    <section className={classes.wrapper}>
      <h2 className={classes.title}>Tutor experience with Gogos Edu</h2>

      <div className={classes.columns}>
        <div className={classes.col}>
          <p className={classes.headline}>“Start in just 3 clicks.”</p>
          <div className={classes.imageFrame}></div>
          <p className={classes.description}>
            No hassle or heavy commitments required at all!
            <br />
            Just sign up and start your session right away.
          </p>
        </div>

        <div className={classes.col}>
          <p className={classes.headline}>“Find right tutor instantly”</p>
          <div className={classes.imageFrame}></div>
          <p className={classes.description}>
            Select tutors by languages, area of interest, and teaching styles to
            ensure a good fit
          </p>
        </div>

        <div className={classes.col}>
          <p className={classes.headline}>“Seamless connection”</p>
          <div className={classes.imageFrame}></div>
          <p className={classes.description}>
            Parents can easily browse profiles, read tutor reviews, and see
            recommendations tailored to their child’s needs. Parents also can
            book the class for the students and share the class link.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;

import React from "react";
import classes from "./Subjects.module.css";
import placeholderIcon from "../assets/TitleImage.svg"; // Placeholder for icons

const CoursesAccessSection = () => {
  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <span className={classes.subheading}>Stem, literature, even tests</span>
        <h2 className={classes.mainTitle}>Access to pool of courses</h2>
        <button className={classes.joinButton}>Join courses</button>
      </header>

      <div className={classes.categories}>
        <div className={classes.category}>
          <h3 className={classes.categoryTitleBlue}>
            General academic enrichment
          </h3>
          <div className={classes.iconRow}>
            <div className={classes.iconItem}>
              <img
                src={placeholderIcon}
                alt="Book club"
                className={classes.icon}
              />
              <p>Book club</p>
            </div>
            <div className={classes.iconItem}>
              <img
                src={placeholderIcon}
                alt="Essay writing"
                className={classes.icon}
              />
              <p>Essay writing</p>
            </div>
            <div className={classes.iconItem}>
              <img
                src={placeholderIcon}
                alt="ESL class"
                className={classes.icon}
              />
              <p>ESL class</p>
            </div>
          </div>
        </div>

        <div className={classes.category}>
          <h3 className={classes.categoryTitlePurple}>Exam prep</h3>
          <div className={classes.iconRow}>
            <div className={classes.iconItem}>
              <img src={placeholderIcon} alt="SAT" className={classes.icon} />
              <p>SAT</p>
            </div>
            <div className={classes.iconItem}>
              <img src={placeholderIcon} alt="ACT" className={classes.icon} />
              <p>ACT</p>
            </div>
            <div className={classes.iconItem}>
              <img src={placeholderIcon} alt="AP" className={classes.icon} />
              <p>AP</p>
            </div>
          </div>
        </div>

        <div className={classes.category}>
          <h3 className={classes.categoryTitleRed}>Subjects</h3>
          <div className={classes.iconRow}>
            <div className={classes.iconItem}>
              <img
                src={placeholderIcon}
                alt="Algebra"
                className={classes.icon}
              />
              <p>Algebra</p>
            </div>
            <div className={classes.iconItem}>
              <img
                src={placeholderIcon}
                alt="Geometry"
                className={classes.icon}
              />
              <p>Geometry</p>
            </div>
            {/* Additional icons for other subjects */}
          </div>
        </div>

        <div className={classes.category}>
          <h3 className={classes.categoryTitleOrange}>AP subjects</h3>
          <div className={classes.iconRow}>
            <div className={classes.iconItem}>
              <img
                src={placeholderIcon}
                alt="AP Biology"
                className={classes.icon}
              />
              <p>AP Biology</p>
            </div>
            <div className={classes.iconItem}>
              <img
                src={placeholderIcon}
                alt="AP Calculus"
                className={classes.icon}
              />
              <p>AP Calculus</p>
            </div>
            {/* Additional icons for other AP subjects */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesAccessSection;

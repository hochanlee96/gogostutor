import React from "react";
import classes from "./Subjects.module.css";

// Import subject icons
import Bookclub1 from "../assets/subjects/Bookclub1.png";
import Bookclub2 from "../assets/subjects/Bookclub2.png";
import Bookclub3 from "../assets/subjects/Bookclub3.png";
import Algebra from "../assets/subjects/Algebra.png";
import Geometry from "../assets/subjects/Geometry.png";
import Physics from "../assets/subjects/Physics.png";
import Biology from "../assets/subjects/Biology.png";
import Chemistry from "../assets/subjects/Chemistry.png";
import English from "../assets/subjects/English.png";
import Literature from "../assets/subjects/Literature.png";
import Geography from "../assets/subjects/Geography.png";

import APBiology from "../assets/subjects/APBiology.png";
import APCalculus from "../assets/subjects/APCalculus.png";
import APChemistry from "../assets/subjects/APChemistry.png";
import APEnglanguage from "../assets/subjects/APEnglanguage.png";
import APUSgov from "../assets/subjects/APUSgov.png";

const subjectGroups = [
  {
    title: "General academic enrichment",
    items: [
      { title: "Book club", icon: Bookclub1 },
      { title: "Book club", icon: Bookclub2 },
      { title: "Book club", icon: Bookclub3 },
    ],
  },
  {
    title: "Subjects",
    items: [
      { title: "Algebra", icon: Algebra },
      { title: "Geometry", icon: Geometry },
      { title: "Physics", icon: Physics },
      { title: "Biology", icon: Biology },
      { title: "Chemistry", icon: Chemistry },
      { title: "English", icon: English },
      { title: "Literature", icon: Literature },
      { title: "Geography", icon: Geography },
    ],
  },
  {
    title: "AP subjects",
    items: [
      { title: "AP Biology", icon: APBiology },
      { title: "AP Calculus", icon: APCalculus },
      { title: "AP Chemistry", icon: APChemistry },
      { title: "AP Eng language", icon: APEnglanguage },
      { title: "AP US gov", icon: APUSgov },
    ],
  },
];

const Subjects = () => {
  return (
    <section className={classes.wrapper}>
      <h2 className={classes.title}>
        Prepared for all subjects for 6th–12th grade students
      </h2>
      <div className={classes.wrapperBox}>
        {subjectGroups.map((group, idx) => (
          <div key={idx} className={classes.group}>
            <h3 className={classes.groupTitle}>{group.title}</h3>
            <div className={classes.grid}>
              {group.items.map((item, index) => (
                <div key={index} className={classes.item}>
                  <img
                    src={item.icon}
                    alt={item.title}
                    className={classes.icon}
                  />
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Subjects;

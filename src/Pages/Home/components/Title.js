import React from "react";
import classes from "./Title.module.css";
import mainImage from "../assets/title_image.jpeg"; // Replace with actual image path

// Import SVGs as components
import { ReactComponent as Vector1 } from "../assets/vectors/vector1.svg";
import { ReactComponent as Vector2 } from "../assets/vectors/vector2.svg";
import { ReactComponent as Vector3 } from "../assets/vectors/vector3.svg";
import { ReactComponent as Vector4 } from "../assets/vectors/vector4.svg";

const Title = () => {
  return (
    <div className={classes.wrapper}>
      {/* SVG Overlays as Components */}
      {/* <Vector1 className={classes.vector1} />
      <Vector2 className={classes.vector2} />
      <Vector3 className={classes.vector3} />
      <Vector4 className={classes.vector4} /> */}

      {/* Main Content */}
      <div className={classes.content}>
        <div className={classes.textBox}>
          <h1 style={{ fontSize: "60px", fontWeight: "700" }}>
            Go fast <br />
            Go flexible <br />
            <span className={classes.highlight}>S-rank</span> tutors
          </h1>
          <p style={{ fontSize: "22px", fontWeight: "700" }}>
            Book excellent tutors in just 3 clicks!
            <br />
            Best fit for 6–12th grade students
          </p>
          <button className={classes.button}>Get Started</button>
        </div>
        <div className={classes.imageBox}>
          <img src={mainImage} alt="Tutoring visual" />
        </div>
      </div>
    </div>
  );
};

export default Title;

import React from "react";
import classes from "./Steps.module.css";

import step1Img from "../assets/student_image.png";
import step2Img from "../assets/student_image.png";
import step3Img from "../assets/student_image.png";
import step4Img from "../assets/student_image.png";

const Steps = () => {
  return (
    <div className={classes.stepsWrapper}>
      <div className={classes.step}>
        <img src={step1Img} alt="Step 1" className={classes.image} />
        <div className={classes.text}>
          <span className={classes.stepNumber}>1ST</span>
          <h2 className={classes.title}>Sign up and take a placement test.</h2>
          <p>
            Once you click the sign up button on this page,{" "}
            <strong>
              you will be linked to a survey that asks about the subjects you
              are available to teach.
            </strong>{" "}
            After that, you will receive tutor’s placement tests.
          </p>
          <p>
            Test will have to be submitted promptly, and assessment process will
            typically take 1-3 business days.
          </p>
        </div>
      </div>

      <div className={`${classes.step} ${classes.reverse}`}>
        <div className={classes.text}>
          <span className={classes.stepNumber}>2ND</span>
          <h2 className={classes.title}>Join our tutor’s community chat.</h2>
          <p>
            <strong>
              Approved tutors will receive an email invitation to join our
              online tutor chat.
            </strong>{" "}
            In this space, you'll stay updated on our latest news (launch date,
            policies, etc.) and have the opportunity to share your ideas for
            improving our service as we prepare for launch.
          </p>
        </div>
        <img src={step2Img} alt="Step 2" className={classes.image} />
      </div>

      <div className={classes.step}>
        <img src={step3Img} alt="Step 3" className={classes.image} />
        <div className={classes.text}>
          <span className={classes.stepNumber}>3RD</span>
          <h2 className={classes.title}>Make your Tutor’s Profile.</h2>
          <p>
            Our system is currently under development.{" "}
            <strong>
              Once it's ready, we will invite you to the Gogos Edu Tutor’s
              Portal.
            </strong>{" "}
            You will be able to create your profile by entering your available
            dates, basic information, and other requested details. A new
            guidebook will be provided when the system is ready.
          </p>
        </div>
      </div>

      <div className={`${classes.step} ${classes.reverse}`}>
        <div className={classes.text}>
          <span className={classes.stepNumber}>4TH</span>
          <h2 className={classes.title}>Tutoring begins.</h2>
          <p>
            According to your availability, students will book an online session
            with you, and you will start performing the sessions.
          </p>
        </div>
        <img src={step4Img} alt="Step 4" className={classes.image} />
      </div>
    </div>
  );
};

export default Steps;

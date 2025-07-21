import classes from "./SimpleSteps.module.css";

const SimpleSteps = () => {
  return (
    <div className={classes.sectionContainer}>
      <div className={classes.introContainer}>
        <div className={classes.introTitle}>Simple 4 Steps for Our Tutors</div>
        <div className={classes.introBody}>
          For both students and tutors, we aim to make the process as simple and
          intuitive as possible. If you're interested, just follow the four
          steps below!
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SimpleSteps;

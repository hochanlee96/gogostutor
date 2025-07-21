import classes from "./Apply.module.css";

const Apply = () => {
  return (
    <div className={classes.sectionContainer}>
      <div className={classes.textContainer}>
        <div className={classes.title}>Apply Now!</div>
        <div className={classes.body}>
          Once you click "Become a Tutor," you will be linked to a survey that
          asks about the subjects you are available to teach. After that, you
          will receive tutor’s placement tests. <br/> Please note that you must hold a
          Google Account to complete the sign up.
        </div>
        <button className={classes.button}>
          <div className={classes.buttonText}>Become a Tutor</div>
        </button>
      </div>
    </div>
  );
};

export default Apply;

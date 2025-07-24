import classes from "./How.module.css";
const How = () => {
  return (
    <div className={classes.sectionContainer}>
      <div className={classes.textContainer}>
        <div className={classes.title}>How does Gogos Edu work?</div>
        <div className={classes.body}>
          Thousands of students in need will join our platform on launch day.
          Before this, tutors will set up their profile pages by listing their
          available subjects, dates, and times. Students will then be able to
          browse through tutor profiles and book sessions based on the tutors'
          availability, displayed in a calendar format.
          <br />
          <br /> Tutors and students will have online sessions at the scheduled
          times.
        </div>
      </div>
    </div>
  );
};

export default How;

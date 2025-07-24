import classes from "./SimpleSteps.module.css";
import image1 from "../../../../shared/assets/images/steps-image-1.png";
import image2 from "../../../../shared/assets/images/steps-image-2.png";
import image3 from "../../../../shared/assets/images/steps-image-3.svg";
import image4 from "../../../../shared/assets/images/steps-image-4.png";
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
      <div className={classes.stepsContainer}>
        <div className={classes.stepContainer}>
          <img src={image1} alt="Step 1" className={classes.stepImage} />
          <div className={classes.stepTextContainer}>
            <div className={classes.stepTextTitle}>
              Sign up and take a placement test.
            </div>
            <div className={classes.stepTextBody}>
              Once you click the sign up button on this page,{" "}
              <strong>
                you will be linked to a survey that asks about the subjects you
                are available to teach.
              </strong>{" "}
              After that, you will receive tutor’s placement tests.
              <br /> <br /> Test will have to be submitted promptly, and
              assessment process will typically take 1-3 business days.
            </div>
          </div>
        </div>
        <div className={classes.stepContainer}>
          <div className={classes.stepTextContainer}>
            <div className={classes.stepTextTitle}>
              Join our tutor’s community chat.
            </div>
            <div className={classes.stepTextBody}>
              <strong>
                Approved tutors will receive an email invitation to join our
                online tutor chat.
              </strong>
              In this space, you'll stay updated on our latest news (launch
              date, policies, etc.) and have the opportunity to share your ideas
              for improving our service as we prepare for launch.
            </div>
          </div>
          <img src={image2} alt="Step 2" className={classes.stepImage} />
        </div>
        <div className={classes.stepContainer}>
          <img src={image3} alt="Step 3" className={classes.stepImage} />
          <div className={classes.stepTextContainer}>
            <div className={classes.stepTextTitle}>
              Complete your Tutor’s Profile.
            </div>
            <div className={classes.stepTextBody}>
              Our system is currently under development.
              <strong>
                Once it's ready, we will invite you to the Gogos Edu Tutor's
                Portal. You will be able to create your profile by entering your
                available dates, basic information, and other requested details.
              </strong>
              A new guidebook will be provided when the system is ready.
            </div>
          </div>
        </div>
        <div className={classes.stepContainer}>
          <div className={classes.stepTextContainer}>
            <div className={classes.stepTextTitle}>Tutoring begins.</div>
            <div className={classes.stepTextBody}>
              According to your availability, students will book an online
              session with you, and you will start performing the sessions.
            </div>
          </div>
          <img src={image4} alt="Step 4" className={classes.stepImage} />
        </div>
      </div>
    </div>
  );
};

export default SimpleSteps;

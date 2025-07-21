import classes from "./Benefits.module.css";

import WebIcon from "../../../../shared/assets/images/www-icon.svg";
import ScheduleIcon from "../../../../shared/assets/images/schedule-icon.svg";
import CapIcon from "../../../../shared/assets/images/cap-icon.svg";
import GraphIcon from "../../../../shared/assets/images/graph-icon.svg";
import ReceiptIcon from "../../../../shared/assets/images/receipt-icon.svg";
import StarIcon from "../../../../shared/assets/images/star-icon.svg";
import BankIcon from "../../../../shared/assets/images/bank-icon.svg";
import LaunchIcon from "../../../../shared/assets/images/launch-icon.svg";

const Benefits = () => {
  return (
    <div className={classes.sectionContainer}>
      <div className={classes.title}>
        Benefits for Tutors, working with Gogos Edu
      </div>
      <div className={classes.tileContainer}>
        <div className={classes.tile}>
          <img alt="web icon" className={classes.icon} src={WebIcon} />
          <div className={classes.tileTitle}>Wide Reach of Students</div>
          <div className={classes.tileBody}>
            Connect with a large pool of 6-12th grade students seeking tutoring
            services across various subjects.
          </div>
        </div>
        <div className={classes.tile}>
          <img alt="schedule icon" className={classes.icon} src={ScheduleIcon} />
          <div className={classes.tileTitle}>Flexible Scheduling</div>
          <div className={classes.tileBody}>
            Set your own availability for tutoring sessions, making it easy to
            balance with other commitments.
          </div>
        </div>
        <div className={classes.tile}>
          <img alt="cap icon" className={classes.icon} src={CapIcon} />
          <div className={classes.tileTitle}>Subject Specialization</div>
          <div className={classes.tileBody}>
            Highlight your expertise in specific subjects, attracting students
            who need help in your area of specialization.
          </div>
        </div>
        <div className={classes.tile}>
          <img alt="launch icon" className={classes.icon} src={LaunchIcon} />
          <div className={classes.tileTitle}>Streamlined Booking System</div>
          <div className={classes.tileBody}>
            Enjoy a hassle-free booking process where students can easily find
            and schedule sessions with you based on your availability.
          </div>
        </div>
        <div className={classes.tile}>
          <img alt="graph icon" className={classes.icon} src={GraphIcon} />
          <div className={classes.tileTitle}>Professional Growth</div>
          <div className={classes.tileBody}>
            Enhance your professional profile by gaining experience and building
            a reputation as a qualified tutor within an organized platform.
          </div>
        </div>
        <div className={classes.tile}>
          <img alt="receipt icon" className={classes.icon} src={ReceiptIcon} />
          <div className={classes.tileTitle}>Competitive Earnings</div>
          <div className={classes.tileBody}>
            Earn a competitive income with flexible rates that reflect your
            experience and expertise.
          </div>
        </div>
        <div className={classes.wideRow}>
          <div className={classes.tile}>
            <img alt="star icon" className={classes.icon} src={StarIcon} />
            <div className={classes.tileTitle}>Supportive Platform</div>
            <div className={classes.tileBody}>
              Benefit from a user-friendly platform with tools designed to help
              you manage your tutoring sessions efficiently.
            </div>
          </div>
          <div className={classes.tile}>
            <img alt="bank icon" className={classes.icon} src={BankIcon} />
            <div className={classes.tileTitle}>Potential for Opportunities</div>
            <div className={classes.tileBody}>
              We are a startup with many other services planned for the future.
              Be among the first to take advantage of future opportunities like
              group classes, VOD tutoring, and more as Gogos Edu expands its
              services.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;

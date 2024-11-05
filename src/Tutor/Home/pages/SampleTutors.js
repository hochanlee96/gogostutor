import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";
import classes from "./SampleTutors.module.css";
import TutorCard from "../components/TutorCard";

import UKIcon from "../../../shared/icons/united-kingdom.png";
import USIcon from "../../../shared/icons/united-states.png";
import KRIcon from "../../../shared/icons/south-korea.png";

const SampleTutors = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className={classes.MainContainer}>
      <h3 className={classes.TextContainer}>
        Access Pool of Tutors Anytime You Want For Any Subject!
      </h3>
      <div className={classes.TutorContainer}>
        <TutorCard
          className={classes.TutorBox}
          tutorName="Michelle Burns"
          rating="4.99"
          numReviews="1905"
          countryIcon={UKIcon}
          origin="Scotland"
          since="2022"
          tutorImageLink="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          description="lorem ipsum dolor sit amet, consectetur adipiscing"
        />
        <TutorCard
          className={classes.TutorBox}
          tutorName="Teacher Colleen"
          rating="4.96"
          numReviews="1188"
          countryIcon={USIcon}
          origin="Herbster, Wisconsin"
          since="2022"
          tutorImageLink="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          description="lorem ipsum dolor sit amet, consectetur adipiscing"
        />
        <TutorCard
          className={classes.TutorBox}
          tutorName="Ronnie UK"
          rating="4.98"
          numReviews="6406"
          countryIcon={UKIcon}
          origin="United Kingdom"
          since="2018"
          tutorImageLink="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          description="lorem ipsum dolor sit amet, consectetur adipiscing"
        />
        <TutorCard
          className={classes.TutorBox}
          tutorName="Sang Kim"
          rating="4.95"
          numReviews="2130"
          countryIcon={KRIcon}
          origin="South Korea"
          since="2022"
          tutorImageLink="https://image.cine21.com/resize/cine21/person/2019/0904/15_45_17__5d6f5d7d0f10a[X252,310].jpg"
          description="lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet, consectetur adipiscing"
        />
      </div>
      <button
        className={classes.MoreTutorsButton}
        onClick={() => {
          if (auth.isLoggedIn) {
            navigate("/tutors");
          } else {
            navigate("/signup");
          }
        }}
      >
        See more tutors
      </button>
    </div>
  );
};

export default SampleTutors;

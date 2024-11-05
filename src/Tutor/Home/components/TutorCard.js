import { useNavigate } from "react-router-dom";

import classes from "./TutorCard.module.css";

import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";

const limitDescriptionLength = (description, size) => {
  return description.length <= size
    ? [description, 0]
    : [description.slice(0, size), 1];
};
const TutorCard = ({
  className,
  tutorName,
  rating,
  numReviews,
  countryIcon,
  origin,
  since,
  tutorImageLink,
  description,
}) => {
  const [descriptionText, seeMore] = limitDescriptionLength(description, 30);
  const navigate = useNavigate();
  return (
    <div className={className}>
      <div className={classes.ProfileBox}>
        <div className={classes.InfoBox}>
          <div className={classes.Name}>{tutorName}</div>
          <div className={classes.Popularity}>
            <div>
              <FaStar /> {rating}
            </div>
            <div>
              <GoDotFill />
              {numReviews} reviews
            </div>
          </div>
          <div>
            <img className={classes.CountryIcon} src={countryIcon} alt="/" />
            {origin}
          </div>
          <div>
            <CiCalendar /> Tutor since {since}
          </div>
        </div>
        <div className={classes.PictureBox}>
          <img className={classes.Picture} src={tutorImageLink} alt="/" />
        </div>
      </div>
      <div className={classes.Description}>
        {descriptionText}
        {seeMore ? (
          <>
            {descriptionText}... <div className={classes.SeeMore}>see more</div>
          </>
        ) : (
          descriptionText
        )}
      </div>
      <div className={classes.HighlightBox}>
        <div className={classes.Highlights}>Highlights</div>
        <div className={classes.HighlightItem}>1000+ Chats</div>
        <div className={classes.HighlightItem}>Certified Teacher</div>
      </div>
      <button
        className={classes.DetailButton}
        onClick={() => {
          navigate("/tutors");
        }}
      >
        View More
      </button>
    </div>
  );
};

export default TutorCard;

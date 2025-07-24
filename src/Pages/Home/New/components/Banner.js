
import classes from "./Banner.module.css";
const Banner = () => {
  return (
    <div className={classes.container}>
      <div className={classes.bannerText}>
        We are planning to launch on Q4 2025. Please sign up to hear more
        details!
      </div>
    </div>
  );
};

export default Banner;
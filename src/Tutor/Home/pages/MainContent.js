import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";

import classes from "./MainContent.module.css";

import StudyImage from "../../../shared/images/guy_sitting_on_books.jpg";
import { FaArrowRight } from "react-icons/fa";

const MainContent = () => {
  const auth = useContext(AuthContext);
  return (
    <div className={classes.MainContainer}>
      <div className={classes.ContentBox}>
        <div className={classes.TextContent}>
          <div className={classes.IntroText}>
            The easiest, yet professional online tutoring for 6-12th grade​
          </div>
          {auth.isLoggedIn ? null : (
            <Link className={classes.Button} to="/signup">
              Get started <FaArrowRight size="15" />
            </Link>
          )}
        </div>
        <img className={classes.ImageBox} src={StudyImage} alt="/" />
      </div>
    </div>
  );
};

export default MainContent;

import { useNavigate } from "react-router-dom";

import TitleImage from "../assets/TitleImage2.svg";

import classes from "./Intro.module.css";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.Container}>
      <div className={classes.TitleImageBox}>
        <img className={classes.TitleImage} src={TitleImage} alt="" />
        <button
          className={classes.JoinButton}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Join Gogos
        </button>
      </div>
    </div>
  );
};

export default Intro;

import { useNavigate } from "react-router-dom";

import TitleImage from "../assets/TitleImage2.svg";

import classes from "./Intro.module.css";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.Container}>
      <img src={TitleImage} alt="" />
      <button
        className={classes.JoinButton}
        onClick={() => {
          navigate("/tutor/signup");
        }}
      >
        Join Gogos
      </button>
    </div>
  );
};

export default Intro;

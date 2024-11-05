import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";

import { FaPencil } from "react-icons/fa6";
import { SiLevelsdotfyi } from "react-icons/si";
import { GrSchedules } from "react-icons/gr";

import classes from "./Instruction.module.css";

const Instruction = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className={classes.Container}>
      <div className={classes.TitleBox}>
        <h1>How does it Work?</h1>
        <h5>Nothing Complicated.</h5>
        <h5>Just sign up and schedule your first class!</h5>
      </div>
      <div className={classes.InstructionLine}>
        <div className={classes.LeftFlex}>
          <FaPencil size="50px" />
          <div className={classes.TextBox}>
            <h6>Sign in / Up</h6>
            <p>
              Sign up clicking the icon on the top right of this page, and
              answer the simple questions
            </p>
          </div>
        </div>
        <div className={classes.RightFlex}>
          <SiLevelsdotfyi size="50px" />
          <div className={classes.TextBox}>
            <h6>Optimized Tutor Powerd by AI</h6>
            <p>
              After you sign up, we recommend you the list of tutors based on
              your needs, using our AI search engine. You can also manually
              browse through our massive pool of tutors.
            </p>
          </div>
        </div>

        <div className={classes.LeftFlex}>
          <GrSchedules size="50px" />
          <div className={classes.TextBox}>
            <h6>Schedule Your Class</h6>
            <p>Found a good match? Schedule your class!</p>
          </div>
        </div>
      </div>
      <div className={classes.ButtonBox}>
        {auth.isLoggedIn ? null : (
          <button
            className={classes.Button}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default Instruction;

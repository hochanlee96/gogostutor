import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";

import classes from "./SubjectType.module.css";

import BookStackIcon from "../../../shared/icons/book-stack.png";
import { FaArrowRight } from "react-icons/fa";

const SubjectType = ({ type, subjectList }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className={classes.Container}>
      <h5 className={classes.SubjectType}>{type}</h5>
      <div className={classes.SubjectContainer}>
        {subjectList
          ? subjectList.map((subject, index) =>
              subject === "" ? (
                <div key={index} className={classes.SubjectBox}>
                  <div
                    className={classes.EmptySubjectIcon}
                    src="/"
                    alt="/"
                  ></div>
                  <div className={classes.SubjectName}>{subject}</div>
                </div>
              ) : (
                <div key={index} className={classes.SubjectBox}>
                  <img
                    className={classes.SubjectIcon}
                    src={BookStackIcon}
                    alt="/"
                  />
                  <div className={classes.SubjectName}>{subject}</div>
                </div>
              )
            )
          : null}
      </div>
      {subjectList ? (
        <button
          className={classes.MoreButton}
          onClick={() => {
            if (auth.isLoggedIn) {
              navigate("/subjects");
            } else {
              navigate("/signup");
            }
          }}
        >
          More <FaArrowRight />
        </button>
      ) : null}
    </div>
  );
};
export default SubjectType;

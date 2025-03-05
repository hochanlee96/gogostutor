import classes from "./CourseBox.module.css";

import { FaChevronRight } from "react-icons/fa";

const CourseBox = ({ subjectList }) => {
  return (
    <div className={classes.CourseInfoBox}>
      <div style={{ fontSize: "16px", fontWeight: "500" }}>Courses</div>
      <div className={classes.CourseListBox}>
        {subjectList.map((subject) => {
          return (
            <div key={subject._id} className={classes.CourseItem}>
              <div
                className={classes.CourseTag}
                style={
                  subject.customColor
                    ? { backgroundColor: subject.customColor }
                    : { backgroundColor: subject.color }
                }
              ></div>
              <div className={classes.CourseContent}>
                <div>{subject.title}</div>
                <FaChevronRight />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseBox;

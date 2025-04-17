import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import classes from "./SubjectCard.module.css";

const SubjectCard = ({
  subject,
  editingCourse,
  setEditingCourse,
  courseId,
}) => {
  const [courseForm, setCourseForm] = useState({
    courseTitle: "",
    description: "",
  });
  const auth = useContext(AuthContext);

  const inputChangeHandler = (event) => {
    setCourseForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const updateCourseData = useCallback(
    async (body) => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL +
            `/tutors/${auth.id}/courses/${courseId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.accessToken,
            },
            body: JSON.stringify(body),
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.status === 200) {
          window.location.reload();
        } else if (data.status === 404) {
          alert("error");
        }
      } catch (err) {
        alert("error");
      }
    },
    [auth.id, auth.accessToken, courseId]
  );

  const subjectCard = (
    <div>
      {/* <h4>{subject.title}</h4>
      <div>category: {subject.category}</div>
      <div>field: {subject.field}</div>
      <div>
        grades:{" "}
        {subject.grade.map((g) => {
          return <button key={g}>{g} </button>; //바꿔야함 button -> div
        })}
      </div>
      <div>status: {subject.status}</div>
      <button onClick={() => deleteSubject(subjectId)}>Delete Subject</button>
      <button onClick={() => {}}>Edit Course</button> */}

      <div className={classes.subjectItem}>
        <div
          className={classes.subjectTag}
          // style={{ backgroundColor: subject.subjectId.color }}
        ></div>
        <div className={classes.subjectBox}>
          <div className={classes.subjectInfo}>
            <div style={{ fontSize: "22px", fontWeight: "700" }}>
              {subject.subject.title}
            </div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              {subject.courseTitle}
            </div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              {subject.description}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: "5px",
            }}
          >
            <div
              style={{
                color: subject.status !== "deleting" ? "#0045a9" : "#ff564d",
                fontWeight: "700",
              }}
            >
              {subject.status}
            </div>

            {editingCourse === courseId ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "5px",
                }}
              >
                <button
                  // disabled={true}
                  className={classes.editButton}
                  style={{ backgroundColor: "rgb(255, 176, 23)" }}
                  onClick={() => {
                    updateCourseData(courseForm);
                    setEditingCourse("");
                  }}
                >
                  save
                </button>
                <button
                  // disabled={true}
                  className={classes.editButton}
                  style={{ backgroundColor: "#ff564d" }}
                  onClick={() => {
                    setEditingCourse("");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <button
                  // disabled={true}
                  className={classes.editButton}
                  onClick={() => {
                    setEditingCourse(courseId);
                  }}
                >
                  Build Course
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {editingCourse === courseId ? (
        <div>
          <div>
            <label>Course Title</label>
            <input
              type="text"
              value={courseForm.courseTitle}
              name="courseTitle"
              placeholder="Your course title"
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label>Course Description</label>
            <textarea
              value={courseForm.description}
              name="description"
              placeholder="Course description"
              onChange={inputChangeHandler}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
  return <div>{subjectCard}</div>;
};

export default SubjectCard;

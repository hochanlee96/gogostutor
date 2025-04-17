import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { API_GetTotalSubjects, API_ModifyTutorSubjects } from "../../../API";

import classes from "./NewSubject.module.css";

const categoryList = [
  "AP",
  "Academic Enrichment",
  "SAT",
  "ACT",
  "Subject Prep",
];
const fieldList = [
  "Science",
  "Math",
  "Foreign Language",
  "Others",
  "Social Science",
  "English",
  "Art",
  "Music",
];

const NewSubject = ({ setCurrentMode }) => {
  const [subjectFilter, setSubjectFilter] = useState({
    category: "",
    field: "",
  });
  const [totalSubjectList, setTotalSubjectList] = useState([]);
  const [filteredSubjectList, setFilteredSubjectList] = useState([]);
  const [currentSubject, setCurrentSubject] = useState("");
  const filteredSubjectsRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const auth = useContext(AuthContext);

  console.log("subjectFilter: ", subjectFilter);

  const getTotalSubjects = useCallback(async () => {
    try {
      const response = await API_GetTotalSubjects();
      const data = await response.json();
      setTotalSubjectList(data.subjectList);
      setFilteredSubjectList(data.subjectList);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const applyNewSubject = useCallback(async () => {
    try {
      const response = await API_ModifyTutorSubjects(
        auth.id,
        "apply",
        currentSubject._id,
        auth.accessToken
      );
      const data = await response.json();
      if (data.status === 200) {
        window.location.reload();
      } else {
        alert("An error has occurred");
      }
    } catch (err) {
      console.log(err);
    }
  }, [auth, currentSubject]);

  useEffect(() => {
    const filtered = totalSubjectList.filter((subject) => {
      const matchCategory =
        !subjectFilter.category || subject.category === subjectFilter.category;
      const matchField =
        !subjectFilter.field || subject.field === subjectFilter.field;
      return matchCategory && matchField;
    });
    setFilteredSubjectList(filtered);
  }, [subjectFilter, totalSubjectList]);

  useEffect(() => {
    getTotalSubjects();
  }, [getTotalSubjects]);

  useEffect(() => {
    const el = filteredSubjectsRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [filteredSubjectList]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
        }}
      >
        <div>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>Selected</div>
          {currentSubject ? (
            <div className={classes.selectedSubjectBox}>
              <div style={{ fontWeight: "700" }}>{currentSubject.title}</div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button className={classes.button} onClick={applyNewSubject}>
                  Apply
                </button>
                <button
                  className={classes.button}
                  onClick={() => {
                    setCurrentSubject("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            Search Subjects
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <div>
              <label>Category</label>
              <select
                value={subjectFilter.category}
                onChange={(event) => {
                  setSubjectFilter((prev) => {
                    return { ...prev, category: event.target.value };
                  });
                }}
              >
                <option value="" diabled>
                  All
                </option>

                {categoryList.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label>Field</label>
              <select
                value={subjectFilter.field}
                onChange={(event) => {
                  setSubjectFilter((prev) => {
                    return { ...prev, field: event.target.value };
                  });
                }}
              >
                <option value="" diabled>
                  All
                </option>
                {fieldList.map((field) => {
                  return (
                    <option key={field} value={field}>
                      {field}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              className={classes.button}
              onClick={() => {
                setSubjectFilter({ category: "", field: "" });
              }}
            >
              Clear filters
            </button>
          </div>
          <div
            style={{ fontSize: "18px", fontWeight: "600" }}
          >{`${filteredSubjectList.length} subjects`}</div>

          <div className={classes.scrollableWrapper} ref={filteredSubjectsRef}>
            {isOverflowing && (
              <div className={classes.scrollHint}>↓ Scroll</div>
            )}

            {filteredSubjectList.map((subject) => {
              return (
                <div
                  key={subject._id}
                  className={classes.Subject}
                  onClick={() => {
                    setCurrentSubject(subject);
                  }}
                >
                  {subject.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSubject;

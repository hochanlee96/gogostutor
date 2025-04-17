import { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";

import { API_GetTutorSubjects, API_ModifyTutorSubjects } from "../../../API";

import SubjectCard from "./SubjectCard";

const SubjectList = ({ setCurrentMode, subjectList = [], loadedSubjects }) => {
  // const [subjectList, setSubjectList] = useState(null);
  const auth = useContext(AuthContext);
  const [editingCourse, setEditingCourse] = useState("");

  // const getTutorSubjects = useCallback(async () => {
  //   try {
  //     const response = await API_GetTutorSubjects(auth.id, auth.accessToken);
  //     const data = await response.json();
  //     setSubjectList(data.subjectList);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [auth]);

  const deregisterTutorSubject = useCallback(
    async (subjectId) => {
      try {
        const response = await API_ModifyTutorSubjects(
          auth.tutorId,
          "deregister",
          subjectId,
          auth.accessToken
        );
        const data = await response.json();
        console.log(data);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    [auth]
  );

  // useEffect(() => {
  //   getTutorSubjects();
  // }, [getTutorSubjects]);

  let subjectListCards = null;
  if (subjectList) {
    subjectListCards = subjectList.map((subject) => {
      return (
        <SubjectCard
          key={subject._id}
          courseId={subject._id}
          subject={subject}
          editingCourse={editingCourse}
          setEditingCourse={setEditingCourse}
        />
      );
    });
  }

  return (
    <div>
      {loadedSubjects ? (
        subjectList.length > 0 ? (
          <div
            style={{
              marginTop: "30px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "30px",
            }}
          >
            {subjectListCards}
          </div>
        ) : (
          <div>
            <div>No subject</div>
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SubjectList;

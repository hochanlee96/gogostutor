import { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";

import { API_GetTutorSubjects, API_ModifyTutorSubjects } from "../../../API";

import SubjectCard from "./SubjectCard";

const SubjectList = ({ setCurrentMode }) => {
  const [subjectList, setSubjectList] = useState(null);
  const auth = useContext(AuthContext);

  const getTutorSubjects = useCallback(async () => {
    try {
      const response = await API_GetTutorSubjects(auth.id, auth.accessToken);
      const data = await response.json();
      setSubjectList(data.subjectList);
    } catch (err) {
      console.log(err);
    }
  }, [auth]);

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

  useEffect(() => {
    getTutorSubjects();
  }, [getTutorSubjects]);

  let subjectListCards = null;
  if (subjectList) {
    subjectListCards = subjectList.map((current) => {
      const currentSubject = current.subject;
      return (
        <SubjectCard
          key={current._id}
          subjectId={currentSubject._id}
          title={currentSubject.title}
          category={currentSubject.category}
          field={currentSubject.field}
          grade={currentSubject.grade}
          status={current.status}
          deleteSubject={deregisterTutorSubject}
        />
      );
    });
  }

  return (
    <div>
      <h1>The list of subjects you can teach</h1>
      <div>{subjectListCards}</div>
      <button
        onClick={() => {
          setCurrentMode("newSubject");
        }}
      >
        Apply for a new subject
      </button>
    </div>
  );
};

export default SubjectList;

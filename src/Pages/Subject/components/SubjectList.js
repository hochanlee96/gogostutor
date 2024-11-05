import { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";

import SubjectCard from "./SubjectCard";

const SubjectList = ({ setCurrentMode }) => {
  const [subjectList, setSubjectList] = useState(null);
  const auth = useContext(AuthContext);

  const getMySubjectList = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutor/get-my-subject-list",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(data.subjectList);
      setSubjectList(data.subjectList);
    } catch (err) {
      console.log(err);
    }
  }, [auth.accessToken]);

  const deleteSubject = useCallback(
    async (subjectId) => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL +
            "/tutor/deregister-my-subject/" +
            subjectId,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.accessToken,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    [auth.accessToken]
  );

  useEffect(() => {
    getMySubjectList();
  }, [getMySubjectList]);

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
          deleteSubject={deleteSubject}
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

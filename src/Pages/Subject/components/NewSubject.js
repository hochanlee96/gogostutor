import { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { API_GetTotalSubjects, API_ModifyTutorSubjects } from "../../../API";

const NewSubject = ({ setCurrentMode }) => {
  const [totalSubjectList, setTotalSubjectList] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null);
  const auth = useContext(AuthContext);

  const getTotalSubjects = useCallback(async () => {
    try {
      const response = await API_GetTotalSubjects();
      const data = await response.json();
      setTotalSubjectList(data.subjectList);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const applyNewSubject = useCallback(async () => {
    try {
      const response = await API_ModifyTutorSubjects(
        auth.tutorId,
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
    getTotalSubjects();
  }, [getTotalSubjects]);

  return (
    <div>
      <h3>Choose Subject</h3>
      <button onClick={() => setCurrentMode("subjectList")}>Cancel</button>
      {currentSubject ? (
        <div>
          <div>Currently selected: {currentSubject.title}</div>
          <button onClick={applyNewSubject}>Apply</button>
        </div>
      ) : null}
      <div>
        {totalSubjectList
          ? totalSubjectList.map((subject) => {
              return (
                <div
                  key={subject._id}
                  onClick={() => {
                    setCurrentSubject(subject);
                  }}
                >
                  {subject.title}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default NewSubject;

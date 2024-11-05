import { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";

const NewSubject = ({ setCurrentMode }) => {
  const [totalSubjectList, setTotalSubjectList] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null);
  const auth = useContext(AuthContext);

  const getTotalSubjectList = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutor/get-total-subject-list",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      const data = await response.json();
      setTotalSubjectList(data.subjectList);
    } catch (err) {
      console.log(err);
    }
  }, [auth.accessToken]);

  const applyNewSubject = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutor/apply-new-subject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
          body: JSON.stringify({ subjectId: currentSubject._id }),
        }
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
  }, [auth.accessToken, currentSubject]);

  useEffect(() => {
    getTotalSubjectList();
  }, [getTotalSubjectList]);

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

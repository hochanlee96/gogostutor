import { useState } from "react";

import SubjectList from "../components/SubjectList";
import NewSubject from "../components/NewSubject";

const MySubjects = () => {
  const [currentMode, setCurrentMode] = useState("subjectList");

  let mainContent = <SubjectList setCurrentMode={setCurrentMode} />;
  if (currentMode === "newSubject") {
    mainContent = <NewSubject setCurrentMode={setCurrentMode} />;
  }
  return (
    <div>
      <h1>My Subjects</h1>
      {mainContent}
    </div>
  );
};

export default MySubjects;

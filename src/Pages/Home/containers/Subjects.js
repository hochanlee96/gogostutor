import SubjectType from "../components/SubjectType";

import classes from "./Subjects.module.css";

const Subjects = () => {
  return (
    <div className={classes.Container}>
      <h3>Prepared for all subjects for 6th-12th grade students</h3>
      <div className={classes.TypesContainer}>
        <SubjectType
          type="General Academic Enrichment"
          subjectList={["Book Club", "Essay Writing", "ESL Class"]}
        />
        <SubjectType
          type="Subjects"
          subjectList={[
            "ALGEBRA",
            "GEOMETRY",
            "PHYSICS",
            "BIOLOGY",
            "CHEMISTRY",
            "ENGLISH",
            "LITERATURE",
            "GEOGRAPHY",
            "",
          ]}
        />
        <SubjectType
          type="AP Subjects"
          subjectList={[
            "AP Biology",
            "AP Calculus",
            "AP Chemistry",
            "AP \n Eng Language",
            "AP US Gov",
            "",
          ]}
        />
        <SubjectType type="Exam Prep" subjectList={["SAT", "ACT", "AP"]} />
        <SubjectType
          type="College Application Care"
          subjectList={["Coming Soon"]}
        />
        {/* <SubjectType
          type="Subjects"
          subjectList={["ALGEBRA", "GEOMETRY", "PHYSICS", "BIOLOGY"]}
        />
        <SubjectType
          type="AP Subjects"
          subjectList={[
            "AP Biology",
            "AP Calculus",
            "AP Chemistry",
            "AP English Language",
          ]}
        /> */}
      </div>
    </div>
  );
};

export default Subjects;

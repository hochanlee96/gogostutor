const SubjectCard = ({
  subjectId,
  title,
  category,
  field,
  grade,
  status,
  deleteSubject,
}) => {
  const subjectCard = (
    <div>
      <h4>{title}</h4>
      <div>category: {category}</div>
      <div>field: {field}</div>
      <div>
        grades:{" "}
        {grade.map((g) => {
          return <button key={g}>{g} </button>; //바꿔야함 button -> div
        })}
      </div>
      <div>status: {status}</div>
      <button onClick={() => deleteSubject(subjectId)}>Delete Subject</button>
    </div>
  );
  return <div>{subjectCard}</div>;
};

export default SubjectCard;

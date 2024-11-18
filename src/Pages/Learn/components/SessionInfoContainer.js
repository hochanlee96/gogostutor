const SessionInfoContainer = ({ sessionInfo }) => {
  console.log("session info: ", sessionInfo);
  const { subjectId, tutorId, studentId } = sessionInfo;
  return (
    <div>
      <h1>{"course title: " + subjectId.title}</h1>
      <h3>{"Start time: " + sessionInfo.startTime}</h3>
      <h4>{"tutor id: " + tutorId.email}</h4>
      <h4>{"Student id: " + studentId.email}</h4>
    </div>
  );
};

export default SessionInfoContainer;

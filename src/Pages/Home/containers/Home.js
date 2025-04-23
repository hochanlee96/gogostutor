import Title from "../components/Title";
import Hear from "../components/Hear";
import SampleTutors from "../components/SampleTutors";
import AI from "../components/AI";
import Subjects from "../components/Subjects";
import How from "../components/How";
import Credits from "../components/Credits";
import Experience from "../components/Experience";
import StudyImage from "../assets/study.png";
import Conclusion from "../components/Conclusion";

import classes from "./Home.module.css";
const Home = () => {
  return (
    <div className={classes.container}>
      <Title />
      <Hear />
      <SampleTutors />
      <AI />
      <Subjects />
      {/* <How /> */}
      {/* <Credits /> */}
      <Experience />
      <div className={classes.studyWrapper}>
        <img src={StudyImage} alt="Study Session" className={classes.image} />
      </div>
      <Conclusion />
    </div>
  );
};

export default Home;

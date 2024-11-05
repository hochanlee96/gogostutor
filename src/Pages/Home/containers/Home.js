import MainContent from "./MainContent";
import SampleTutors from "./SampleTutors";
import Subjects from "./Subjects";
import Instruction from "./Instruction";

import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.Container}>
      <h1>This is the Tutors' homepage</h1>
      <MainContent />
      <SampleTutors />
      <Subjects />
      <Instruction />
    </div>
  );
};

export default Home;

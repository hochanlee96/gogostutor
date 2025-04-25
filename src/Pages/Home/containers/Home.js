import { useContext } from "react";
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

import Banner from "../components/Banner";
import Info from "../components/Info";
import Steps from "../components/Steps";
import Benefits from "../components/Benefits";
import Apply from "../components/Apply";
import FAQ from "../components/FAQ";
import Share from "../components/Share";

import { AuthContext } from "../../../shared/context/auth-context";

import classes from "./Home.module.css";
const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <div className={classes.container}>
      {/* <Title /> */}
      <Banner />
      <Info />
      <Steps />
      <Benefits />
      <Apply isLoggedIn={auth.isLoggedIn} />
      <FAQ />
      {/* <Share />
      <Hear />
      <SampleTutors />
      <AI />
      <Subjects /> */}
      {/* <How /> */}
      {/* <Credits /> */}
      {/* <Experience /> */}
      {/* <div className={classes.studyWrapper}>
        <img src={StudyImage} alt="Study Session" className={classes.image} />
      </div>
      <Conclusion /> */}
    </div>
  );
};

export default Home;

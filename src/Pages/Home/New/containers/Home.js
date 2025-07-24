import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Benefits from "../components/Benefits";
import How from "../components/How";
import SimpleSteps from "../components/SimpleSteps";
import Resources from "../components/Resources";
import Apply from "../components/Apply";

import classes from "./Home.module.css";
const Home = () => {
  return (
    <div className={classes.container}>
      <Hero />
      <Banner />
      <How />
      <SimpleSteps />
      <Benefits />
      <Resources />
      <Apply />
    </div>
  );
};

export default Home;

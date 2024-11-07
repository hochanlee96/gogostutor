import { Route, Navigate, Routes } from "react-router-dom";

// import Navigation from "../Tutor/Navigation/Navigation";
import Navigation from "./shared/UI/Navigation/Test/NavigationTest";
import ScrollToTop from "./shared/UI/Navigation/ScrollToTop";
import Footer from "./shared/UI/Navigation/Footer";

// import Home from "../Tutor/Home/pages/Home";
import Home from "./Pages/Home/Test/pages/HomeTest";
import Login from "./Pages/Authentication/containers/Login";
import Signup from "./Pages/Authentication/containers/Signup";
import Dashboard from "./Pages/Tutor/containers/Dashboard";
import Profile from "./Pages/Profile/containers/Profile";
import MySubjects from "./Pages/Subject/containers/MySubjects";
import Schedule from "./Pages/Schedule/containers/Schedule";
import Chatting from "./Pages/Chatting/containers/Chatting";
import Zoom from "./Pages/Zoom/containers/Zoom";
import Learn from "./Pages/Learn/containers/Learn";
import Settings from "./Pages/Settings/containers/Settings";
// import Test from "../Tutor/Test/pages/Test";
import Test from "./Pages/Zoom/containers/ZoomTest";
import Verify from "./Pages/Test/containers/Test";

const TutorRoutes = ({ isSignedIn }) => {
  let routes;
  if (isSignedIn) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/profile" element={<Profile />} />

        <Route exact path="/my-subjects" element={<MySubjects />} />
        <Route exact path="/schedule" element={<Schedule />} />
        <Route exact path="/zoom/:sessionId" element={<Zoom />} />
        <Route exact path="/learn/:sessionId" element={<Learn />} />
        <Route exact path="/account-settings" element={<Settings />} />
        <Route exact path="/messages" element={<Chatting />} />
        <Route exact path="/test/:sessionId" element={<Test />} />
        <Route exact path="/test" element={<Verify />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main>{routes}</main>
      <Footer />
    </>
  );
};

export default TutorRoutes;

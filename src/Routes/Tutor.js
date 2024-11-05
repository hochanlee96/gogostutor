import { Route, Navigate, Routes } from "react-router-dom";

// import Navigation from "../Tutor/Navigation/Navigation";
import Navigation from "../Tutor/Navigation/Test/NavigationTest";
import ScrollToTop from "../Tutor/Navigation/ScrollToTop";
import Footer from "../Tutor/Navigation/Footer";

// import Home from "../Tutor/Home/pages/Home";
import Home from "../Tutor/Home/Test/pages/HomeTest";
import Login from "../Tutor/Authentication/pages/Login";
import Signup from "../Tutor/Authentication/pages/Signup";
import Dashboard from "../Tutor/Tutor/pages/Dashboard";
import Profile from "../Tutor/Profile/pages/Profile";
import MySubjects from "../Tutor/Subject/pages/MySubjects";
import Schedule from "../Tutor/Schedule/pages/Schedule";
import Chatting from "../Tutor/Chatting/pages/Chatting";
import Zoom from "../Tutor/Zoom/pages/Zoom";
import Learn from "../Tutor/Learn/pages/Learn";
import Settings from "../Tutor/Settings/pages/Settings";
// import Test from "../Tutor/Test/pages/Test";
import Test from "../Tutor/Zoom/pages/ZoomTest";

const TutorRoutes = ({ isSignedIn }) => {
  let routes;
  if (isSignedIn) {
    routes = (
      <Routes>
        <Route exact path="/tutor" element={<Home />} />
        <Route exact path="/tutor/dashboard" element={<Dashboard />} />
        <Route exact path="/tutor/profile" element={<Profile />} />

        <Route exact path="/tutor/my-subjects" element={<MySubjects />} />
        <Route exact path="/tutor/schedule" element={<Schedule />} />
        <Route exact path="/tutor/zoom/:sessionId" element={<Zoom />} />
        <Route exact path="/tutor/learn/:sessionId" element={<Learn />} />
        <Route exact path="/tutor/account-settings" element={<Settings />} />
        <Route exact path="/tutor/messages" element={<Chatting />} />
        <Route exact path="/tutor/test/:sessionId" element={<Test />} />
        <Route path="/*" element={<Navigate replace to="/tutor" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/tutor/" element={<Home />} />
        <Route exact path="/tutor/login" element={<Login />} />
        <Route exact path="/tutor/signup" element={<Signup />} />
        <Route path="/*" element={<Navigate replace to="/tutor" />} />
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

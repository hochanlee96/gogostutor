import { Route, Navigate, Routes } from "react-router-dom";

import Navigation from "../Student/Navigation/Navigation";
import ScrollToTop from "../Student/Navigation/ScrollToTop";
import Footer from "../Student/Navigation/Footer";

import Home from "../Student/Home/pages/Home";
import Dashboard from "../Student/User/pages/Dashboard";
import Tutors from "../Student/Tutors/pages/Tutors";
import TutorDetail from "../Student/Tutors/pages/TutorDetail";
import Login from "../Student/Authentication/pages/Login";
import Signup from "../Student/Authentication/pages/Signup";
import CourseDetail from "../Student/Courses/pages/CourseDetail";
import Courses from "../Student/Courses/pages/Courses";
import Settings from "../Student/Settings/pages/Settings";
import Chatting from "../Student/Chatting/pages/Chatting";
import Schedule from "../Student/Schedule/pages/Schedule";
import Profile from "../Student/Profile/pages/Profile";
import Zoom from "../Student/Zoom/pages/Zoom";
import Learn from "../Student/Learn/pages/Learn";

import Test from "../Student/Test/pages/Test";

const StudentRoutes = ({ isSignedIn }) => {
  let routes;
  if (isSignedIn) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/tutors/:tutorId" element={<TutorDetail />} />
        <Route exact path="/tutors" element={<Tutors />} />
        <Route exact path="/courses/:courseId" element={<CourseDetail />} />
        <Route exact path="/courses" element={<Courses />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/account-settings" element={<Settings />} />
        <Route exact path="/messages" element={<Chatting />} />
        <Route exact path="/schedule" element={<Schedule />} />
        <Route exact path="/zoom/:sessionId" element={<Zoom />} />
        <Route exact path="/Learn/:sessionId" element={<Learn />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/test" element={<Test />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/tutors/:tutorId" element={<TutorDetail />} />
        <Route exact path="/tutors" element={<Tutors />} />
        <Route exact path="/courses/:courseId" element={<CourseDetail />} />
        <Route exact path="/courses" element={<Courses />} />
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

export default StudentRoutes;

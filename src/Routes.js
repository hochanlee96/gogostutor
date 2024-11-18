import { Route, Navigate, Routes } from "react-router-dom";

// import Navigation from "../Tutor/Navigation/Navigation";
import Navigation from "./shared/UI/Navigation/Test/NavigationTest";
import ScrollToTop from "./shared/UI/Navigation/ScrollToTop";
import Footer from "./shared/UI/Navigation/Footer";

// import Home from "../Tutor/Home/pages/Home";
import Home from "./Pages/Home/Test/pages/HomeTest";
import Login from "./Pages/Authentication/containers/Login";
import Signup from "./Pages/Authentication/containers/Signup";
import Dashboard from "./Pages/Dashboard/containers/Dashboard";
import Profile from "./Pages/Profile/containers/Profile";
import MySubjects from "./Pages/Subject/containers/MySubjects";
import Schedule from "./Pages/Schedule/containers/Schedule";
import Chatting from "./Pages/Chatting/containers/Chatting";
import Learn from "./Pages/Learn/containers/Learn";
import Settings from "./Pages/Settings/containers/Settings";
// import Test from "../Tutor/Test/pages/Test";
import VerifyEmail from "./Pages/Verify/containers/VerifyEmail";
import AccountSettingsTest from "./Pages/Settings/Test/containers/AccountSettings";

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

        <Route exact path="/learn/:sessionId" element={<Learn />} />
        <Route exact path="/account-settings" element={<Settings />} />
        <Route exact path="/messages" element={<Chatting />} />

        <Route exact path="/verify-email" element={<VerifyEmail />} />
        <Route
          exact
          path="/account-settings-test"
          element={<AccountSettingsTest />}
        />
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

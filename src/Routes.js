import React from "react";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";

// import Navigation from "../Tutor/Navigation/Navigation";
import Navigation from "./shared/UI/Navigation/New/Navigation";
import ScrollToTop from "./shared/UI/Navigation/New/ScrollToTop";
// import Footer from "./shared/UI/Navigation/Footer";
import Footer from "./shared/UI/Navigation/New/Footer";

// import Home from "../Tutor/Home/pages/Home";
import Home from "./Pages/Home/Test/pages/HomeTest";
import Login from "./Pages/Authentication/containers/Login";
import Signup from "./Pages/Authentication/containers/Signup";
import CompleteProfile from "./Pages/Authentication/containers/CompleteProfile";
import Dashboard from "./Pages/Dashboard/containers/Dashboard";
import Profile from "./Pages/Profile/containers/Profile";
import MySubjects from "./Pages/Subject/containers/MySubjects";
import Schedule from "./Pages/Schedule/containers/Schedule";
import Classroom from "./Pages/Classroom/containers/Classroom";
import Chatting from "./Pages/Chatting/containers/Chatting";
import Learn from "./Pages/Learn/containers/Learn";
import Settings from "./Pages/Settings/containers/AccountSettings";
// import Test from "../Tutor/Test/pages/Test";
import VerifyEmail from "./Pages/Verify/containers/VerifyEmail";
import EmailVerifiedRedirect from "./Pages/Verify/containers/EmailVerifiedRedirect";
import PaymentTest from "./Pages/PaymentTest/containers/PaymentTest";
import Test from "./Pages/Test/Test";
import {
  CheckoutTest,
  ReturnTest,
} from "./Pages/PaymentTest/containers/CheckoutTest";
import PayoutTest from "./Pages/PaymentTest/containers/PayoutTest";

import classes from "./Routes.module.css";

const NavigationLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};
const FooterLayout = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

const TutorRoutes = ({ isSignedIn, profileCompleted }) => {
  let routes;
  if (isSignedIn) {
    routes = (
      <Routes>
        {/* <Route element={<FooterLayout />}> */}
        {profileCompleted ? null : (
          <Route exact path="/complete-profile" element={<CompleteProfile />} />
        )}
        <Route element={<NavigationLayout />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/profile" element={<Profile />} />

          <Route exact path="/my-subjects" element={<MySubjects />} />
          <Route exact path="/schedule" element={<Schedule />} />

          <Route exact path="/classroom" element={<Classroom />} />

          <Route exact path="/learn/:sessionId" element={<Learn />} />
          <Route exact path="/account-settings" element={<Settings />} />
          <Route exact path="/messages" element={<Chatting />} />

          <Route exact path="/verify-email" element={<VerifyEmail />} />
          <Route exact path="/payment-test" element={<PaymentTest />} />
          <Route exact path="/checkout-test" element={<CheckoutTest />} />
          <Route exact path="/checkout-return-test" element={<ReturnTest />} />
          <Route exact path="/payout-test" element={<PayoutTest />} />
          <Route exact path="/test" element={<Test />} />

          <Route path="/*" element={<Navigate replace to="/" />} />
        </Route>
        {/* </Route> */}
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<CompleteProfile />} />
        <Route element={<NavigationLayout />}>
          <Route
            exact
            path="/email-verification-redirect"
            element={<EmailVerifiedRedirect />}
          />
          <Route exact path="/" element={<Home />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    );
  }
  return (
    <>
      <ScrollToTop />
      {/* <Navigation /> */}
      <main>{routes}</main>
      {/* <Footer /> */}
    </>
  );
};

export default TutorRoutes;

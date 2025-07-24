import React, { useState } from "react";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";

import Navigation from "./Navigation";
import ScrollToTop from "./shared/UI/Navigation/New/ScrollToTop";
import Sidebar from "./shared/component/Sidebar/Sidebar";
import Footer from "./shared/component/Footer/new/Footer";
import Error from "./Pages/Error/containers/Error";
import AppWithErrorBoundary from "./ErrorBoundary";
import Home from "./Pages/Home/New/containers/Home";
import Login from "./Pages/Authentication/containers/Login";
import ForgotPassword from "./Pages/Authentication/containers/ForgotPassword";
import ResetPassword from "./Pages/Authentication/containers/ResetPassword";
import Signup from "./Pages/Authentication/containers/Signup";
import CompleteProfile from "./Pages/Authentication/containers/CompleteProfile";
import Dashboard from "./Pages/Dashboard/New/containers/Dashboard";
import Profile from "./Pages/Profile/New/containers/Profile";
import MySubjects from "./Pages/Subject/containers/MySubjects";
import Schedule from "./Pages/Schedule/containers/Schedule";
import Classroom from "./Pages/Classroom/containers/Classroom";
import Chatting from "./Pages/Chatting/containers/Chatting";
import Learn from "./Pages/Learn/containers/Learn";
import Settings from "./Pages/Settings/containers/AccountSettings";
import VerifyEmail from "./Pages/Verify/containers/VerifyEmail";
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

const ErrorBoundaryLayout = () => {
  return (
    <AppWithErrorBoundary>
      <Outlet />
    </AppWithErrorBoundary>
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

const SidebarLayout = ({ collapsed, setCollapsed }) => {
  return (
    <div style={{ display: "flex", width: "100vw" }}>
      <div
        className={`${classes.SidebarContainer} ${
          collapsed ? classes.SidebarContainerCollapsed : ""
        }`}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div
        className={`${classes.MainContainer} ${
          collapsed ? classes.MainContainerCollapsed : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

const TutorRoutes = ({ isSignedIn, profileCompleted }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  let routes;
  if (isSignedIn) {
    routes = (
      <Routes>
        <Route element={<ErrorBoundaryLayout />}>
          {/* {profileCompleted ? null : (
            <Route
              exact
              path="/complete-profile"
              element={<CompleteProfile />}
            />
          )} */}
          <Route element={<NavigationLayout />}>
            <Route exact path="/" element={<Home />} />
            <Route
              element={
                <SidebarLayout
                  collapsed={sidebarCollapsed}
                  setCollapsed={setSidebarCollapsed}
                />
              }
            >
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/my-subjects" element={<MySubjects />} />
              <Route exact path="/messages" element={<Chatting />} />
            </Route>

            <Route exact path="/schedule" element={<Schedule />} />

            <Route exact path="/classroom" element={<Classroom />} />

            <Route exact path="/learn/:sessionId" element={<Learn />} />
            <Route exact path="/account-settings" element={<Settings />} />

            <Route exact path="/payment-test" element={<PaymentTest />} />
            <Route exact path="/checkout-test" element={<CheckoutTest />} />
            <Route
              exact
              path="/checkout-return-test"
              element={<ReturnTest />}
            />
            <Route element={<FooterLayout />}>
              <Route exact path="/verify-email" element={<VerifyEmail />} />
              <Route exact path="/payout-test" element={<PayoutTest />} />
              <Route exact path="/test" element={<Test />} />
              <Route exact path="/error" element={<Error />} />
              <Route exact path="/" element={<Home />} />
              <Route path="/*" element={<Navigate replace to="/" />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route element={<ErrorBoundaryLayout />}>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/email-verification-redirect/:status"
            element={<EmailVerifiedRedirect />}
          />
          {/* <Route exact path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route
            exact
            path="/reset-password/:token"
            element={<ResetPassword />}
          /> */}
          <Route element={<NavigationLayout />}>
            <Route element={<FooterLayout />}>
              <Route exact path="/error" element={<Error />} />
              <Route exact path="/" element={<Home />} />
              <Route path="/*" element={<Navigate replace to="/" />} />
            </Route>
          </Route>
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

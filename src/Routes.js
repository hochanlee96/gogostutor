import React, { useState } from "react";
import { Route, Navigate, Routes, Outlet, useLocation } from "react-router-dom";

import Navigation from "./Navigation";
import ScrollToTop from "./shared/UI/Navigation/New/ScrollToTop";
import Footer from "./shared/component/Footer/new/Footer";
import Sidebar from "./shared/components/Sidebar/New/Sidebar";
import AppWithErrorBoundary from "./ErrorBoundary";

import Home from "./Pages/Home/New/containers/Home";
import Login from "./Pages/Authentication/Login/containers/Login";
import Signup from "./Pages/Authentication/Signup/containers/Signup";
import EmailVerifiedRedirect from "./Pages/Authentication/Verify/containers/EmailVerifiedRedirect";

import Dashboard from "./Pages/Dashboard/Old/containers/Dashboard";
import Profile from "./Pages/Profile/New/containers/Profile";
import MySubjects from "./Pages/Subject/containers/MySubjects";
import Schedule from "./Pages/Schedule/containers/Schedule";
import Classroom from "./Pages/Classroom/containers/Classroom";
import Chatting from "./Pages/Chatting/containers/Chatting";
import Learn from "./Pages/Learn/containers/Learn";
import Settings from "./Pages/Settings/containers/AccountSettings";
import VerifyEmail from "./Pages/Verify/containers/VerifyEmail";
import PaymentTest from "./Pages/PaymentTest/containers/PaymentTest";
import {
  CheckoutTest,
  ReturnTest,
} from "./Pages/PaymentTest/containers/CheckoutTest";
import PayoutTest from "./Pages/PaymentTest/containers/PayoutTest";
import Test from "./Pages/Test/Test";
import Error from "./Pages/Error/containers/Error";

import classes from "./Routes.module.css";

const NavigationLayout = ({ isSignedIn }) => {
  const location = useLocation();
  const hidNavBarPaths = ["/dashboard"];
  const shouldShowNavBar = !hidNavBarPaths.includes(location.pathname);
  return (
    <div>
      {shouldShowNavBar && <Navigation isSignedIn={isSignedIn} />}
      <Outlet />
    </div>
  );
};

const FooterLayout = () => (
  <div>
    <Outlet />
    <Footer />
  </div>
);

const ErrorBoundaryLayout = () => (
  <AppWithErrorBoundary>
    <Outlet />
  </AppWithErrorBoundary>
);

const SidebarLayout = ({ collapsed, setCollapsed }) => (
  <div style={{ display: "flex", width: "100vw" }}>
    <div
      className={`${classes.SidebarContainer} ${
        collapsed ? classes.SidebarContainerCollapsed : ""
      }`}
    >
      <Sidebar />
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

const TutorRoutes = ({ isSignedIn, profileCompleted }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <ScrollToTop />
      <main>
        <Routes>
          <Route element={<ErrorBoundaryLayout />}>
            {/* Public Routes */}
            <Route
              path="/email-verification-redirect/:status"
              element={<EmailVerifiedRedirect />}
            />
            {!isSignedIn && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
            <Route element={<NavigationLayout isSignedIn={isSignedIn} />}>
              <Route element={<FooterLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/payout-test" element={<PayoutTest />} />
                <Route path="/test" element={<Test />} />
                <Route path="/error" element={<Error />} />
                <Route path="/*" element={<Navigate replace to="/" />} />
              </Route>

              {/* Protected Routes */}
              {isSignedIn && (
                <>
                  <Route
                    element={
                      <SidebarLayout
                        collapsed={sidebarCollapsed}
                        setCollapsed={setSidebarCollapsed}
                      />
                    }
                  >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/my-subjects" element={<MySubjects />} />
                    <Route path="/messages" element={<Chatting />} />
                  </Route>
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/classroom" element={<Classroom />} />
                  <Route path="/learn/:sessionId" element={<Learn />} />
                  <Route path="/account-settings" element={<Settings />} />
                  <Route path="/payment-test" element={<PaymentTest />} />
                  <Route path="/checkout-test" element={<CheckoutTest />} />
                  <Route
                    path="/checkout-return-test"
                    element={<ReturnTest />}
                  />
                </>
              )}
            </Route>
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default TutorRoutes;

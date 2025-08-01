import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../../shared/context/auth-context";
import { UserContext } from "../../../../shared/context/user-context";

import classes from "./Dashboard.module.css";

import DashboardData from "../components/DashboardData";
import BuildProfile from "../components/BuildProfile";
import BuildCourse from "../components/BuildCourse";
import News from "../components/News";
import Events from "../components/Events";

import Calendar from "../components/Calendar";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const userData = user.data;

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    }
  }, [userData]);

  let loadingContents;
  if (isLoading) {
    loadingContents = (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={classes.Container}>
      <div className={classes.MainContainer}>
        <DashboardData userData={userData} />
        <BuildProfile />
        <BuildCourse />
        <News />
        <Events />
      </div>
      <div className={classes.SideContainer}>
        <Calendar />
        <div className={classes.notificationBox}>Notification Box</div>
      </div>
    </div>
  );
};

export default Dashboard;

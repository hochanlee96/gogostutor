import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../../shared/context/auth-context";
import { UserContext } from "../../../../shared/context/user-context";

import { API_ApplyForApproval } from "../../../../API";

import classes from "./Dashboard.module.css";

import { IoArrowForwardCircleOutline } from "react-icons/io5";
import TutorRatingImg from "../../../../shared/assets/icons/reputation.png";
import CollegeImg from "../../../../shared/assets/icons/school.png";
import CalendarImg from "../../../../shared/assets/icons/calendar.png";
import ChecklistImg from "../../../../shared/assets/icons/checklist.png";

import emptyUserImage from "../../../../shared/assets/icons/user.png";

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

  return <div>dashboard</div>;
};

export default Dashboard;

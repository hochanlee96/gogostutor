import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";
import { UserContext } from "../../../shared/context/user-context";

import {
  API_ApplyForApproval,
  API_GetProfileImageFromCloudinary,
} from "../../../API";

import classes from "./Dashboard.module.css";

import { IoArrowForwardCircleOutline } from "react-icons/io5";
import TutorRatingImg from "../../../shared/assets/icons/reputation.png";
import CollegeImg from "../../../shared/assets/icons/school.png";
import CalendarImg from "../../../shared/assets/icons/calendar.png";
import ChecklistImg from "../../../shared/assets/icons/checklist.png";

import emptyUserImage from "../../../shared/assets/icons/user.png";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);

  const user = useContext(UserContext);
  const userData = user.data;
  const tutorStatus =
    userData && userData.approval ? userData.approval : "pending";
  // const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const applyForApproval = async () => {
    const response = await API_ApplyForApproval(
      auth.id,
      { approval: "pending" },
      auth.accessToken
    );
    const data = await response.json();
    if (data.status === 200) {
      auth.setApprovalStatus(data.approval);
    } else {
      console.log(data.message);
    }
  };

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    }
  }, [userData]);

  // const getProfileImageFromCloudinary = useCallback(async (imageURL) => {
  //   const image = await API_GetProfileImageFromCloudinary(imageURL);
  //   setProfileImage(image);
  // }, []);

  // useEffect(() => {
  //   if (profileData.imageURL) {
  //     getProfileImageFromCloudinary(profileData.imageURL);
  //   }
  // }, [getProfileImageFromCloudinary, profileData.imageURL]);

  let loadingContents;
  if (isLoading) {
    loadingContents = (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  let approval_button = (
    <button className={classes.Button} onClick={applyForApproval}>
      Apply to become a tutor
    </button>
  );
  if (tutorStatus === "pending") {
    approval_button = (
      <button className={classes.PendingButton}>Approval Pending</button>
    );
  } else if (tutorStatus === "approved") {
    approval_button = (
      <button className={classes.ApprovedButton}>Approved</button>
    );
  }

  let tutorStatusComponent = (
    <div className={classes.TutorCategoryBox}>
      <img className={classes.ImgBox} src={TutorRatingImg} alt="/" />
      <h4>Subject tutors</h4>
      <p>You will be able to register subjects you are professional at</p>
      {approval_button}
    </div>
  );
  if (tutorStatus === "approved") {
    tutorStatusComponent = (
      <div className={classes.AprovedStatusBox}>
        <div className={classes.ScheduleBox}>
          <h4>Tutoring Schedule</h4>
          <img className={classes.CalImgBox} src={CalendarImg} alt="/" />
          <IoArrowForwardCircleOutline
            size="40px"
            onClick={() => navigate("/schedule")}
          />
        </div>
        <div className={classes.ProfileBox}>
          <div className={classes.ProfileLine}>
            <img className={classes.CheckImgBox} src={ChecklistImg} alt="/" />
            <h5>Complete Your profile</h5>
          </div>

          <IoArrowForwardCircleOutline
            size="40px"
            onClick={() => {
              navigate("/profile");
            }}
            className={classes.IconColor}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.Container}>
      {isLoading ? (
        loadingContents
      ) : (
        <div className={classes.ContentsBox}>
          <div className={classes.LeftContent}>
            {/* {user.profile.imageURL ? (
              <img
                className={classes.UserIcon}
                src={user.profile.imageURL}
                alt="/"
              />
            ) : (
              <img className={classes.UserIcon} src={emptyUserImage} alt="/" />
            )} */}
            <img
              className={classes.UserIcon}
              src={user.profile.imageURL || emptyUserImage}
              alt="/"
            />

            {userData && userData.profile && userData.profile.firstName ? (
              <h3>
                {"Welcome to Gogos Edu " + userData.profile.firstName + " !"}
              </h3>
            ) : (
              <h3>Welcom to Gogos Edu!</h3>
            )}

            <div className={classes.TutorProgress}>
              <div className={classes.StatBox}>
                <div>Lessons</div>
                <div className={classes.Stat}>0</div>
                <div>Minutes with students</div>
                <div className={classes.Stat}>0</div>
              </div>
            </div>
            <div className={classes.RecordLine}>
              <div>See your record</div>
              <IoArrowForwardCircleOutline size="40px" />
            </div>
          </div>
          <div className={classes.RightContent}>
            {tutorStatusComponent}

            <div className={classes.TutorCategoryBox}>
              <img className={classes.ImgBox} src={CollegeImg} alt="/" />
              <h5>College App Service Coming Soon</h5>
              <p>
                We are looking for professional mentors and tutors who can help
                students aim their dream school
              </p>
              <button className={classes.Button}>
                Get notification when ready
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

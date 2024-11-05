import { useState, useContext, useEffect, useCallback } from "react";

import Button from "../../../shared/UI/components/FormElements/Button";

import { AuthContext } from "../../../shared/context/auth-context";
import { ProfileContext } from "../../../shared/context/profile-context";

import classes from "./Profile.module.css";

const Profile = () => {
  const auth = useContext(AuthContext);
  const profile = useContext(ProfileContext);

  const [isEditMode, setIsEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    about: "",
    experience: "",
    education: "",
  });
  const [tempProfileForm, setTempProfileForm] = useState({
    firstName: "",
    lastName: "",
    about: "",
    experience: "",
    education: "",
  });

  useEffect(() => {
    if (profile && profile.profileData) {
      console.log("profile: ", profile);
      setProfileForm({ ...profile.profileData });
    }
  }, [profile]);

  const updateProfileData = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/tutor/update-profile-data",
        {
          method: "POST",
          body: JSON.stringify({
            profileData: tempProfileForm,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      const data = await response.json();

      if (data.status === 200) {
        alert(data.message);
        profile.setProfileData(data.profileData);
        setTempProfileForm({
          firstName: "",
          lastName: "",
          about: "",
          experience: "",
          education: "",
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }, [auth.accessToken, profile, tempProfileForm]);

  const editModeToggler = async () => {
    if (isEditMode) {
      //=== was edit mode === want to save profile data into the server
      updateProfileData();
    } else {
      setTempProfileForm(profileForm);
    }
    setIsEditMode((prev) => !prev);
  };
  const profileInputChangeHandler = (event) => {
    setTempProfileForm({
      ...tempProfileForm,
      [event.target.name]: event.target.value,
    });
  };

  let profileInputForm = (
    <>
      <label>First Name</label>
      <input
        value={profileForm.firstName}
        name="firstName"
        disabled={!isEditMode}
      />
      <label>Last Name</label>
      <input
        value={profileForm.lastName}
        name="lastName"
        disabled={!isEditMode}
      />
      <label>About Me</label>
      <textarea value={profileForm.about} name="about" disabled={!isEditMode} />
      <label>Work Experience</label>
      <textarea
        value={profileForm.experience}
        name="experience"
        disabled={!isEditMode}
      />
      <label>Education</label>
      <textarea
        value={profileForm.education}
        name="education"
        disabled={!isEditMode}
      />
    </>
  );

  if (isEditMode) {
    profileInputForm = (
      <>
        <label>First Name</label>
        <input
          value={tempProfileForm.firstName}
          name="firstName"
          onChange={profileInputChangeHandler}
        />
        <label>Last Name</label>
        <input
          value={tempProfileForm.lastName}
          name="lastName"
          onChange={profileInputChangeHandler}
        />
        <label>About Me</label>
        <textarea
          value={tempProfileForm.about}
          name="about"
          onChange={profileInputChangeHandler}
        />
        <label>Work Experience</label>
        <textarea
          value={tempProfileForm.experience}
          name="experience"
          onChange={profileInputChangeHandler}
        />
        <label>Education</label>
        <textarea
          value={tempProfileForm.education}
          name="education"
          onChange={profileInputChangeHandler}
        />
      </>
    );
  }

  return (
    <div className={classes.ProfileContainer}>
      <h1>Profile</h1>
      <label>Email</label>
      <div>{auth.email}</div>
      <Button text={isEditMode ? "Save" : "Edit"} onClick={editModeToggler} />
      {isEditMode ? (
        <Button
          text="Cancel"
          onClick={() => {
            setTempProfileForm(profileForm);
            setIsEditMode(false);
          }}
        />
      ) : null}
      {profileInputForm}
    </div>
  );
};

export default Profile;

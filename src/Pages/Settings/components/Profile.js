import { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { UserContext } from "../../../shared/context/user-context";

import {
  API_GetProfileImageFromCloudinary,
  API_UpdateProfileImage,
} from "../../../API";

import classes from "./Profile.module.css";

import emptyUserImage from "../../../shared/assets/icons/user.png";

const TutorProfile = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    about: "",
    experience: "",
    education: "",
  });

  useEffect(() => {
    if (user && user.data && user.data.profile) {
      setProfileForm({
        firstName: user.data.profile.firstName,
        lastName: user.data.profile.lastName,
        about: user.data.profile.about,
        experience: user.data.profile.experience,
        education: user.data.profile.education,
      });
    }
  }, [user]);

  const inputChangeHandler = (event) => {
    setProfileForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const getProfileImage = useCallback(async (imageURL) => {
    const image = await API_GetProfileImageFromCloudinary(imageURL);
    setProfileImage(image);
  }, []);

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const updateProfileImage = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      // the upload_preset is a naming convention from cloudinary do not rename it.
      formData.append("upload_preset", uploadPreset);
      formData.append("cloud_name", cloudName);

      const cloudResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (cloudResponse.ok) {
        const cloudData = await cloudResponse.json();
        const imageURL = cloudData.secure_url;
        const response = await API_UpdateProfileImage(
          auth.id,
          imageURL,
          auth.accessToken
        );
        const data = await response.json();
        if (data.status === 200) {
          user.getProfileData();

          //delete previous profile image if successfully uploaded
        } else {
          //delete from cloudinary and
          console.log("error has occured");
          alert("an error has occurred!");
        }
      } else {
        //
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (profile && profile.profileData && profile.profileData.imageURL) {
  //     getProfileImage(profile.profileData.imageURL);
  //   }
  // }, [profile, getProfileImage]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Your Tutor Profile</h1>
      <div className={classes.section}>
        <label className={classes.label}>Profile Picture</label>
        <div className={classes.ImageWrapper}>
          <div className={classes.ButtonImage}>
            {profileImage ? (
              <img className={classes.UserIcon} src={profileImage} alt="" />
            ) : (
              <img className={classes.UserIcon} src={emptyUserImage} alt="" />
            )}
          </div>
          <input
            className={classes.FileInput}
            type="file"
            onChange={updateProfileImage}
          />
        </div>
      </div>

      <div className={classes.section}>
        <label className={classes.label}>First Name</label>
        <input
          name="firstName"
          type="text"
          value={profileForm.firstName}
          className={classes.input}
          onChange={inputChangeHandler}
        />
      </div>
      <div className={classes.section}>
        <label className={classes.label}>Last Name</label>
        <input
          name="lastName"
          type="text"
          value={profileForm.lastName}
          className={classes.input}
          onChange={inputChangeHandler}
        />
      </div>

      <div className={classes.section}>
        <label className={classes.label}>About Me</label>
        <textarea
          name="about"
          value={profileForm.about}
          className={classes.textarea}
          onChange={inputChangeHandler}
        ></textarea>
      </div>

      <div className={classes.section}>
        <label className={classes.label}>Email</label>
        <div className={classes.inlineInput}>
          <input
            name="email"
            type="email"
            value={user && user.data ? user.data.email : ""}
            className={classes.input}
            disabled
          />
          {/* <button className={classes.button}>Update</button> */}
        </div>
      </div>

      <div className={classes.section}>
        <label className={classes.label}>Subject</label>
        <div className={classes.inlineInput}>
          <input
            name="subject"
            type="text"
            placeholder="Add more subjects"
            className={classes.input}
            disabled
          />
          <button className={classes.button}>Add</button>
        </div>
      </div>

      <div className={classes.section}>
        <label className={classes.label}>Education</label>
        <textarea
          name="education"
          value={profileForm.education}
          className={classes.textarea}
          onChange={inputChangeHandler}
        ></textarea>
      </div>

      <div className={classes.section}>
        <label className={classes.label}>Tutor Experience</label>
        <textarea
          name="experience"
          value={profileForm.experience}
          className={classes.textarea}
          onChange={inputChangeHandler}
        ></textarea>
      </div>

      <button className={classes.saveButton}>Save all changes</button>
    </div>
  );
};

export default TutorProfile;

import { useState, useEffect, useCallback, useContext } from "react";
import SettingBox from "../components/SettingBox";

import { AuthContext } from "../../../shared/context/auth-context";
import { ProfileContext } from "../../../shared/context/profile-context";

import {
  API_UpdateProfileImage,
  API_GetProfileImageFromCloudinary,
} from "../../../API";

import classes from "./Settings.module.css";
import { SettingData1, SettingData2 } from "./SettingData";
import emptyUserImage from "../../../shared/assets/icons/user.png";

const Settings = () => {
  const auth = useContext(AuthContext);
  const profile = useContext(ProfileContext);
  const profileData = profile.profileData;
  const [profileImage, setProfileImage] = useState(null);

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
          profile.getProfileData();

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

  const getProfileImageFromCloudinary = useCallback(async (imageURL) => {
    const image = await API_GetProfileImageFromCloudinary(imageURL);
    setProfileImage(image);
  }, []);

  useEffect(() => {
    if (profileData.imageURL) {
      getProfileImageFromCloudinary(profileData.imageURL);
    }
  }, [getProfileImageFromCloudinary, profileData.imageURL]);

  return (
    <div className={classes.Container}>
      <div className={classes.AccountBox}>
        <div className={classes.ImageWrapper}>
          <div className={classes.ButtonImage}>
            {profileImage ? (
              <img className={classes.UserIcon} src={profileImage} alt="" />
            ) : (
              <img className={classes.UserIcon} src={emptyUserImage} alt="" />
            )}
          </div>
          <input type="file" onChange={updateProfileImage} />
        </div>
        <div className={classes.AccountInfoBox}>
          <div>{profileData.email}</div>
          <div>Tutor ID: {" " + auth.id}</div>
        </div>
      </div>
      <div className={classes.SettingsContainer}>
        <div className={classes.SettingsRow}>
          {SettingData1.map((data) => {
            return (
              <SettingBox
                title={data.title}
                description={data.description}
                key={data.title}
                iconName={data.iconName}
                link={data.link}
              />
            );
          })}
        </div>
        <div className={classes.SettingsRow}>
          {SettingData2.map((data) => {
            return (
              <SettingBox
                title={data.title}
                description={data.description}
                key={data.title}
                iconName={data.iconName}
                link={data.link}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Settings;

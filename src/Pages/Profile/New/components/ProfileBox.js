import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { UserContext } from "../../../../shared/context/user-context";
import Select from "react-select";
import countryList from "react-select-country-list";
import ISO6391 from "iso-639-1";

import ImageUploader from "./ImageUploader";

import classes from "./ProfileBox.module.css";
import EmptyUserImage from "../../../../shared/assets/icons/user.png";

import { teachingStyles } from "./teachingStyles";

const DataBox = ({
  title,
  name,
  data,
  inputChangeHandler,
  original,
  setData,
  updateProfile,
}) => {
  const [disabled, setDisabled] = useState(true);
  const edited = data !== original;

  return (
    <div className={classes.DataContainer}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={classes.DataContainerTitle}>{title}</div>
        {disabled ? (
          <div
            className={classes.editButton}
            onClick={() => {
              setDisabled((prev) => !prev);
            }}
          >
            Edit
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            {edited ? (
              <div
                className={classes.editButton}
                onClick={() => {
                  updateProfile({ [name]: data });
                  setDisabled((prev) => !prev);
                }}
              >
                Save
              </div>
            ) : null}
            <div
              className={classes.editButton}
              onClick={() => {
                setDisabled((prev) => !prev);
                setData((prevv) => {
                  return { ...prevv, [name]: original };
                });
              }}
            >
              Cancel
            </div>
          </div>
        )}
      </div>
      <div>
        {disabled ? (
          <div>{data}</div>
        ) : (
          <input
            className={classes.DataInput}
            type="text"
            value={data ?? ""}
            name={name}
            onChange={inputChangeHandler}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};

const SelectBox = ({
  title,
  name,
  isMulti,
  options,
  value,
  onChange,
  original,
  setData,
  updateProfile,
}) => {
  const compareData = (list1, list2) => {
    if (list1.length !== list2.length) return false; // Different lengths → Not identical

    // Convert both lists to sorted JSON strings for direct comparison
    const normalize = (list) =>
      JSON.stringify(
        list
          .map((obj) => ({ value: obj.value, label: obj.label }))
          .sort((a, b) => a.value.localeCompare(b.value))
      );

    return normalize(list1) === normalize(list2);
  };

  const [disabled, setDisabled] = useState(true);
  const edited = !compareData(value, original);

  return (
    <div className={classes.DataContainer}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={classes.DataContainerTitle}>{title}</div>
        {disabled ? (
          <div
            className={classes.editButton}
            onClick={() => {
              setDisabled((prev) => !prev);
            }}
          >
            Edit
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            {edited ? (
              <div
                className={classes.editButton}
                onClick={() => {
                  updateProfile({ [name]: value });
                  setDisabled((prev) => !prev);
                }}
              >
                Save
              </div>
            ) : null}
            <div
              className={classes.editButton}
              onClick={() => {
                setData((prev) => {
                  return { ...prev, [name]: original };
                });
                setDisabled((prev) => !prev);
              }}
            >
              Cancel
            </div>
          </div>
        )}
      </div>
      {disabled ? (
        <div style={{ display: "flex", gap: "10px" }}>
          {value.map((item) => {
            return <div key={item.label}>{item.label}</div>;
          })}
        </div>
      ) : (
        <div>
          <Select
            isMulti={isMulti}
            options={options}
            value={value}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

const ProfileBox = () => {
  const user = useContext(UserContext);
  const updateProfileData = user.updateProfileData;
  const [profileForm, setProfileForm] = useState({
    imageURL: "",
    firstName: "",
    lastName: "",
    nationality: [],
    languages: [],
    teachingStyles: [],
    about: "",
    education: "",
    experience: "",
  });
  const [originalProfileForm, setOriginalProfileForm] = useState({
    imageURL: "",
    firstName: "",
    lastName: "",
    nationality: [],
    languages: [],
    teachingStyles: [],
    about: "",
    education: "",
    experience: "",
  });
  const [selectedTeachingStyles, setSelectedTeachingStyles] = useState([]);
  const nationalityOptions = useMemo(() => countryList().getData(), []);
  const languageOptions = ISO6391.getAllNames().map((lang) => ({
    value: ISO6391.getCode(lang), // Language code
    label: lang, // Language name
  }));

  useEffect(() => {
    if (user && user.profile) {
      setProfileForm((prev) => {
        return { ...prev, ...user.profile };
      });
      setOriginalProfileForm((prev) => {
        return { ...prev, ...user.profile };
      });
    }
  }, [user]);

  useEffect(() => {
    const change = {};
    for (let key in profileForm) {
      if (profileForm[key] !== originalProfileForm[key]) {
        change[key] = profileForm[key];
      }
    }
  }, [originalProfileForm, profileForm]);

  const inputChangeHandler = (event) => {
    setProfileForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const nationalitySelectHandler = (selected) => {
    setProfileForm((prev) => {
      return { ...prev, nationality: selected };
    });
  };

  const languageSelectHandler = (selected) => {
    setProfileForm((prev) => {
      return { ...prev, languages: selected };
    });
  };

  const teachingStyleSelectHandler = (selected) => {
    setProfileForm((prev) => {
      return { ...prev, teachingStyles: selected };
    }); // React-select returns an array of selected options
  };

  return (
    <div className={classes.Container}>
      <div style={{ fontSize: "22px", fontWeight: "700" }}>
        Basic Information
      </div>
      <div className={classes.PictureBox}>
        <div style={{ fontSize: "16px", fontWeight: "600" }}>
          Profile Picture
        </div>
        <ImageUploader imageURL={profileForm.imageURL} />
        {/* {profileForm.imageURL ? (
          <img
            className={classes.UserIcon}
            src={profileForm.imageURL}
            alt="/"
          />
        ) : (
          <img className={classes.UserIcon} src={EmptyUserImage} alt="/" />
        )} */}
      </div>
      <DataBox
        title="First Name"
        name="firstName"
        data={profileForm.firstName}
        inputChangeHandler={inputChangeHandler}
        original={originalProfileForm.firstName}
        setData={setProfileForm}
        updateProfile={updateProfileData}
      />
      <DataBox
        title="Last Name"
        name="lastName"
        data={profileForm.lastName}
        inputChangeHandler={inputChangeHandler}
        original={originalProfileForm.lastName}
        setData={setProfileForm}
        updateProfile={updateProfileData}
      />
      <DataBox
        title="About Me"
        name="about"
        data={profileForm.about}
        inputChangeHandler={inputChangeHandler}
        original={originalProfileForm.about}
        setData={setProfileForm}
        updateProfile={updateProfileData}
      />
      <SelectBox
        title="Nationality"
        name="nationality"
        isMulti={true}
        options={nationalityOptions}
        value={profileForm.nationality}
        onChange={nationalitySelectHandler}
        original={originalProfileForm.nationality}
        setData={setProfileForm}
        updateProfile={updateProfileData}
      />

      <SelectBox
        title="Languages"
        name="languages"
        isMulti={true}
        options={languageOptions}
        value={profileForm.languages}
        onChange={languageSelectHandler}
        original={originalProfileForm.languages}
        setData={setProfileForm}
        updateProfile={updateProfileData}
      />

      <SelectBox
        title="Teaching Styles"
        name="teachingStyles"
        isMulti={true}
        options={teachingStyles}
        value={profileForm.teachingStyles}
        onChange={teachingStyleSelectHandler}
        original={originalProfileForm.teachingStyles}
        setData={setProfileForm}
        updateProfile={updateProfileData}
      />

      <DataBox
        title="Education"
        name="education"
        data={profileForm.education}
        inputChangeHandler={inputChangeHandler}
        original={originalProfileForm.education}
        setData={setProfileForm}
        updateProfile={updateProfileData}
      />

      <DataBox
        title="Experience"
        name="experience"
        data={profileForm.experience}
        inputChangeHandler={inputChangeHandler}
        original={originalProfileForm.experience}
        setData={setProfileForm}
        updateProfile={updateProfileData}
      />
    </div>
  );
};

export default ProfileBox;

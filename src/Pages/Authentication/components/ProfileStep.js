import classes from "../containers/CompleteProfile.module.css";

const ProfileStep = ({ inputChangeHandler, signupForm }) => {
  return (
    <div className={classes.form}>
      <label>Name</label>
      <div className={classes.nameFields}>
        <input
          type="text"
          name="firstName"
          value={signupForm.firstName.value}
          onChange={inputChangeHandler}
          placeholder="First name"
          className={classes.input}
        />
        <input
          type="text"
          name="lastName"
          value={signupForm.lastName.value}
          onChange={inputChangeHandler}
          placeholder="Last name"
          className={classes.input}
        />
      </div>
    </div>
  );
};

export default ProfileStep;

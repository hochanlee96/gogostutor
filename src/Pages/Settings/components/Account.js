import React from "react";
import classes from "./Account.module.css";

const Account = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Your Account</h1>

      <div className={classes.row}>
        <div className={classes.section}>
          <label className={classes.label}>First Name</label>
          <input type="text" value="Tyler" className={classes.input} />
        </div>
        <div className={classes.section}>
          <label className={classes.label}>Last Name</label>
          <input type="text" value="Todd" className={classes.input} />
        </div>
      </div>

      <div className={classes.row}>
        <div className={classes.section}>
          <label className={classes.label}>Email</label>
          <div className={classes.inlineInput}>
            <input
              type="email"
              value="tyler1004@gmail.com"
              className={classes.input}
            />
            <button className={classes.button}>Update</button>
          </div>
        </div>
      </div>

      <div className={classes.row}>
        <div className={classes.section}>
          <label className={classes.label}>Password</label>
          <div className={classes.inlineInput}>
            <input type="password" value="******" className={classes.input} />
            <button className={classes.button}>Update</button>
          </div>
        </div>
      </div>

      <div className={classes.row}>
        <div className={classes.section}>
          <label className={classes.label}>Mobile Number</label>
          <div className={classes.inlineInput}>
            <input
              type="text"
              value="010-0000-0000"
              className={classes.input}
            />
            <button className={classes.button}>Update</button>
          </div>
        </div>
      </div>

      <div className={classes.row}>
        <div className={classes.section}>
          <label className={classes.label}>Referral Code</label>
          <div className={classes.inlineInput}>
            <input
              type="text"
              placeholder="Enter codes"
              className={classes.input}
            />
            <button className={classes.button}>Apply</button>
          </div>
        </div>
      </div>

      <button className={classes.saveButton}>Save all changes</button>
    </div>
  );
};

export default Account;

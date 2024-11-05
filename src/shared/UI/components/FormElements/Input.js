import React from "react";

import classes from "./Input.module.css";

const Input = ({ title, name, value, onChange, type, onBlur }) => {
  return (
    <div className={classes.InputBox}>
      <label className={classes.Label}>{title}</label>
      <input
        className={classes.Input}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;

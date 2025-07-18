import { useState } from "react";
import classes from "./InputBox.module.css";
import { ReactComponent as ShowPasswordIcon } from "../../../../shared/assets/icons/eye-show.svg";
import { ReactComponent as HidePasswordIcon } from "../../../../shared/assets/icons/eye-hide.svg";

export const InputBox = ({
  title,
  name,
  value,
  type,
  placeholder,
  disabled,
  onChange,
  onFocus,
  onBlur,
  error = false,
  errorMessage,
}) => {
  const [inputType, setInputType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);

  const handleOnClickShowPassword = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={classes.InputTitle}>{title}</div>
      <div className={classes.PasswordBox}>
        <input
          title={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          type={inputType}
          placeholder={placeholder}
          className={`${classes.Input} ${error && classes.InputError}`}
          disabled={disabled}
        />
        {errorMessage && (
          <div className={classes.ErrorMessageBox}>{errorMessage}</div>
        )}
        {type === "password" && (
          <button
            className={classes.ShowPasswordButton}
            onClick={handleOnClickShowPassword}
            tabIndex="-1"
            type="button"
          >
            {showPassword ? (
              <HidePasswordIcon
                style={{ fill: "var(--grayscale-placeholder)" }}
              />
            ) : (
              <ShowPasswordIcon
                style={{ fill: "var(--grayscale-placeholder)" }}
              />
            )}
          </button>
        )}
      </div>
    </>
  );
};

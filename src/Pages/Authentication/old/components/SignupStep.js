import { useEffect, useCallback } from "react";
import validator from "validator";

import { API_CheckEmailExists } from "../../../API";
import EmailVerification from "./EmailVerification";

import classes from "../containers/CompleteProfile.module.css";

const SignupStep = ({ signupForm, setSignupForm, inputChangeHandler }) => {
  const emailValidateHandler = async () => {
    try {
      const isEmail = validator.isEmail(signupForm.email.value);

      if (isEmail) {
        const response = await API_CheckEmailExists(signupForm.email.value);
        const data = await response.json();

        if (data.message === "available") {
          setSignupForm((prev) => {
            return { ...prev, email: { ...prev.email, state: "available" } };
          });
        } else if (data.status === 403) {
          setSignupForm((prev) => {
            return {
              ...prev,
              email: { ...prev.email, state: "invalid" },
            };
          });
        }
      } else {
        setSignupForm((prev) => {
          return {
            ...prev,
            email: { ...prev.email, state: "wrong format" },
          };
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const passwordValidateHandler = useCallback(() => {
    const isLongEnough = validator.isLength(signupForm.password.value, {
      min: 8,
    });

    // Check if password contains at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(signupForm.password.value);

    if (isLongEnough && hasUppercase) {
      setSignupForm((prev) => {
        return {
          ...prev,
          password: { ...prev.password, state: "valid" },
        };
      });
    } else {
      setSignupForm((prev) => {
        return {
          ...prev,
          password: { ...prev.password, state: "invalid" },
        };
      });
    }
  }, [signupForm.password.value, setSignupForm]);

  useEffect(() => {
    passwordValidateHandler();
  }, [passwordValidateHandler]);

  const confirmPasswordValidateHandler = useCallback(() => {
    if (signupForm.password.value === signupForm.confirmPassword.value) {
      setSignupForm((prev) => {
        return {
          ...prev,
          confirmPassword: { ...prev.confirmPassword, state: "valid" },
        };
      });
    } else {
      setSignupForm((prev) => {
        return {
          ...prev,
          confirmPassword: { ...prev.confirmPassword, state: "invalid" },
        };
      });
    }
  }, [
    setSignupForm,
    signupForm.password.value,
    signupForm.confirmPassword.value,
  ]);

  useEffect(() => {
    if (signupForm.password.state === "valid") {
      confirmPasswordValidateHandler();
    }
  }, [signupForm.password.state, confirmPasswordValidateHandler]);

  return (
    <div className={classes.form}>
      <label>Email</label>
      <input
        name="email"
        placeholder="Email"
        value={signupForm.email.value}
        onChange={inputChangeHandler}
        disabled={signupForm.email.state === "valid"}
        onBlur={() => {
          emailValidateHandler();
          setSignupForm((prev) => {
            return { ...prev, email: { ...prev.email, touched: true } };
          });
        }}
        type="email"
        className={classes.input}
      />
      <div className={classes.verifyButtonBox}>
        <EmailVerification
          email={signupForm.email.value}
          signupForm={signupForm}
          setSignupForm={setSignupForm}
        />
        {signupForm.email.state === "invalid" ? (
          <div className={classes.ErrorMessage}>
            A user with this email already exists.
          </div>
        ) : signupForm.email.state === "available" ? (
          <div className={classes.verifyButtonBox}>
            <div className={classes.SuccessMessage}>
              This email is available
            </div>
          </div>
        ) : signupForm.email.state ===
          "valid" ? //   <div className={classes.SuccessMessage}>This email is verified</div>
        null : signupForm.email.state === "wrong format" ? (
          <div className={classes.ErrorMessage}>
            Please provide a proper email format
          </div>
        ) : null}
      </div>

      <label>Password</label>
      <input
        name="password"
        placeholder="Password"
        value={signupForm.password.value}
        onChange={inputChangeHandler}
        type="password"
        onBlur={() =>
          setSignupForm((prev) => {
            return { ...prev, password: { ...prev.password, touched: true } };
          })
        }
        className={classes.input}
      />

      {signupForm.password.state === "valid" ? (
        <div className={classes.SuccessMessage}>This is a strong password.</div>
      ) : signupForm.password.touched ? (
        signupForm.password.state === "invalid" ? (
          <div className={classes.ErrorMessage}>
            Your password must contain at least one upper case letter and 8
            characters.
          </div>
        ) : null
      ) : null}
      <label>Confirm Password</label>
      <input
        name="confirmPassword"
        placeholder="Confirm Password"
        value={signupForm.confirmPassword.value}
        onChange={inputChangeHandler}
        type="password"
        onBlur={() =>
          setSignupForm((prev) => {
            return {
              ...prev,
              confirmPassword: { ...prev.confirmPassword, touched: true },
            };
          })
        }
        className={classes.input}
      />

      {signupForm.confirmPassword.state === "valid" ? (
        <div className={classes.SuccessMessage}>
          Your password is confirmed.
        </div>
      ) : signupForm.confirmPassword.touched ? (
        signupForm.confirmPassword.state === "invalid" ? (
          <div className={classes.ErrorMessage}>
            Your password does not match.
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default SignupStep;

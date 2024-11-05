import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import { AuthContext } from "../../../shared/context/auth-context";
import { ProfileContext } from "../../../shared/context/profile-context";
import { ModeContext } from "../../../shared/context/mode-context";
import Input from "../../../shared/components/FormElements/Input";

import CustomGoogleLogin from "../components/GoogleLogin";

import Logo from "../../../shared/icons/A-List_logo_rmbg.svg";
// import GoogleLogo from "../../shared/icons/google-logo.png";
import FacebookLogo from "../../../shared/icons/facebook-logo.png";
import AppleLogo from "../../../shared/icons/apple-logo.png";

import classes from "./Auth.module.css";

const Signup = () => {
  const [emailInput, setEmailInput] = useState("");
  const [emailValidity, setEmailValidity] = useState("unchecked");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordValidity, setPasswordValidity] = useState("unchecked");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [confirmPasswordValidity, setConfirmPasswordValidity] =
    useState("unchecked");
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const auth = useContext(AuthContext);
  const profile = useContext(ProfileContext);
  const mode = useContext(ModeContext);
  const navigate = useNavigate();
  const inputChangeHandler = (event) => {
    if (event.target.name === "email") {
      setEmailInput(event.target.value);
    } else if (event.target.name === "password") {
      setPasswordInput(event.target.value);
    } else if (event.target.name === "confirmPassword") {
      setConfirmPasswordInput(event.target.value);
    }
  };

  const passwordValidateHandler = useCallback(() => {
    const isLongEnough = validator.isLength(passwordInput, { min: 8 });

    // Check if password contains at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(passwordInput);

    if (isLongEnough && hasUppercase) {
      setPasswordValidity("valid");
    } else {
      setPasswordValidity("invalid");
    }
  }, [passwordInput]);

  useEffect(() => {
    passwordValidateHandler();
  }, [passwordValidateHandler]);

  const confirmPasswordValidateHandler = useCallback(() => {
    if (passwordValidity === "valid") {
      if (passwordInput === confirmPasswordInput) {
        setConfirmPasswordValidity("valid");
      } else {
        setConfirmPasswordValidity("invalid");
      }
    } else {
      setConfirmPasswordValidity("passwordInvalid");
    }
  }, [confirmPasswordInput, passwordInput, passwordValidity]);

  useEffect(() => {
    confirmPasswordValidateHandler();
  }, [confirmPasswordValidateHandler]);

  const emailValidateHandler = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/tutor/validate-email/" +
          emailInput,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data.message);
      if (data.status === 200) {
        setEmailValidity("valid");
      } else if (data.status === 403) {
        setEmailValidity("invalid");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signupRequestHandler = async () => {
    try {
      if (
        emailValidity === "valid" &&
        passwordValidity === "valid" &&
        confirmPasswordValidity === "valid"
      ) {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/tutor/signup",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailInput,
              password: passwordInput,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        const authData = data.authData;
        const profileData = data.profileData;
        if (data.status === 200) {
          auth.login(authData);
          profile.setProfileData(profileData);
          navigate("/dashboard");
        } else if (data.status === 403) {
          alert(data.message);
        }
      } else {
        alert(
          "Please fill in all the required fields and check the validity of your input."
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    signupRequestHandler();
  };
  return (
    <div className={classes.Container}>
      <div className={classes.LoginBox}>
        <div className={classes.Title}>
          <img src={Logo} alt="/" className={classes.Logo} />
          <h3 style={{ marginBottom: 0 }}>Tutor Sign up</h3>
        </div>
        <form className={classes.FormBox} onSubmit={onSubmitHandler}>
          <Input
            title="Email"
            name="email"
            value={emailInput}
            onChange={inputChangeHandler}
            onBlur={() => {
              emailValidateHandler();
              setTouched((prev) => {
                return { ...prev, email: true };
              });
            }}
            type="email"
          />
          {emailValidity === "invalid" ? (
            <div className={classes.ErrorMessage}>
              A user with this email already exists.
            </div>
          ) : emailValidity === "valid" ? (
            <div className={classes.SuccessMessage}>
              This email is available
            </div>
          ) : null}
          <Input
            title="Password"
            name="password"
            value={passwordInput}
            onChange={inputChangeHandler}
            type="password"
            onBlur={() =>
              setTouched((prev) => {
                return { ...prev, password: true };
              })
            }
          />
          {passwordValidity === "valid" ? (
            <div className={classes.SuccessMessage}>
              This is a strong password.
            </div>
          ) : touched["password"] ? (
            passwordValidity === "invalid" ? (
              <div className={classes.ErrorMessage}>
                Your password must contain at least one upper case letter and 8
                characters.
              </div>
            ) : null
          ) : null}
          <Input
            title="Confirm Password"
            name="confirmPassword"
            value={confirmPasswordInput}
            onChange={inputChangeHandler}
            type="password"
            onBlur={() =>
              setTouched((prev) => {
                return { ...prev, confirmPassword: true };
              })
            }
          />

          {confirmPasswordValidity === "valid" ? (
            <div className={classes.SuccessMessage}>
              Your password is confirmed.
            </div>
          ) : touched["confirmPassword"] ? (
            confirmPasswordValidity === "invalid" ? (
              <div className={classes.ErrorMessage}>
                Your password does not match.
              </div>
            ) : null
          ) : null}
          <button className={classes.Button} onClick={null}>
            Sign up
          </button>
          <hr />
        </form>
        <div className={classes.SocialLoginBox}>
          <div className={classes.SocialLoginItem}>
            {/* <img className={classes.SocialLogo} src={GoogleLogo} alt="/" />
            Login with Google */}
            <CustomGoogleLogin />
          </div>
          <div className={classes.SocialLoginItem}>
            <img className={classes.SocialLogo} src={FacebookLogo} alt="/" />
            Login with Facebook
          </div>
          <div className={classes.SocialLoginItem}>
            <img className={classes.SocialLogo} src={AppleLogo} alt="/" />
            Login with Apple
          </div>
        </div>

        <div className={classes.RedirectLine}>
          <p className={classes.RedirectMessage}>Already a member?</p>
          <button
            className={classes.RedirectLink}
            onClick={() => {
              navigate("/tutor/login");
            }}
          >
            Log in here
          </button>
        </div>
        <div className={classes.RedirectLine}>
          <button
            className={classes.RedirectLink}
            onClick={() => {
              mode.switchMode();
            }}
          >
            Switch to Student mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

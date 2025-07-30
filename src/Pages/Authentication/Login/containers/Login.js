import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import { AuthContext } from "../../../../shared/context/auth-context";

import { API_Login } from "../../../../API";

import LanguageSelector from "../../../../shared/components/LanguageSeletor/LanguageSelector";
import NavButtons from "../components/NavButtons";
import SocialLoginBox from "../../SocialLogin/components/SocialLoginBox";

import Logo from "../../../../shared/assets/icons/gogos-edu-text-logo-white.svg";
// import PhoneMockup from "../../../../shared/assets/icons/phone-mockup.svg";

import { ReactComponent as ShowPasswordIcon } from "../../../../shared/assets/icons/eye-show.svg";
import { ReactComponent as HidePasswordIcon } from "../../../../shared/assets/icons/eye-hide.svg";
import classes from "./Login.module.css";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [remember, setRemember] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const inputChangeHandler = (event) => {
    if (event.target.name === "email") {
      setEmailInput(event.target.value);
    } else if (event.target.name === "password") {
      setPasswordInput(event.target.value);
    }
  };

  const emailValidateHandler = () => {
    setEmailErrorMessage("");
    const isEmail = validator.isEmail(emailInput);
    if (!isEmail) {
      setEmailErrorMessage("Check your email input");
    }
  };

  const loginRequestHandler = async () => {
    try {
      setEmailErrorMessage("");
      setPasswordErrorMessage("");
      if (!emailInput || !passwordInput) {
        if (!emailInput) {
          setEmailErrorMessage("Please enter you email address");
        }
        if (!passwordInput) {
          setPasswordErrorMessage("Please enter your password");
        }
      } else {
        const response = await API_Login({
          email: emailInput,
          password: passwordInput,
          remember: remember,
        });
        const data = await response.json();
        const authData = data.authData;

        if (data.status === 200) {
          auth.login(authData.accessToken, () => {
            navigate("/dashboard");
          });
        } else if (data.status === 403) {
          setPasswordInput("");
          setPasswordErrorMessage("Your password is incorrect");
        }
      }
    } catch (err) {}
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    loginRequestHandler();
  };

  const handleOnClickShowPassword = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");

    setShowPassword(!showPassword);
  };

  const handleOnClickLogo = () => {
    navigate("/");
  };

  const handleOnClickForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className={classes.Container}>
      <div className={classes.LeftContainer}>
        <button className={classes.GogosLogo} onClick={handleOnClickLogo}>
          <img alt="logo" src={Logo} />
        </button>
        <p className={classes.Header}>
          Sign up <br /> and start learning
        </p>
        {/* <div className={classes.SubText}>Available on mobile</div> */}
        {/* <img alt="mockup" src={PhoneMockup} /> */}
      </div>
      <div className={classes.RightContainer}>
        <LanguageSelector />
        <NavButtons login={true} />
        <div className={classes.ContentContainer}>
          <div className={classes.SigninContainer}>
            <div className={classes.SigninText}>Sign in</div>
            <div className={classes.SigninSubText}>
              Real tutors, real results.
            </div>
          </div>
          <div className={classes.LoginContainer}>
            <div className={classes.SocialLoginContainer}>
              <div className={classes.SocialLoginText}>Continue with</div>
              <SocialLoginBox />
            </div>
          </div>
          <form
            className={classes.RegularLoginContainer}
            onSubmit={onSubmitHandler}
          >
            <div className={classes.EmailAndPassword}>
              <div className={classes.EmailBox}>
                <input
                  title="Email"
                  name="email"
                  value={emailInput}
                  onChange={inputChangeHandler}
                  type="email"
                  placeholder="Email"
                  className={`${classes.Input} ${
                    emailErrorMessage ? classes.InputError : ""
                  }`}
                  onInvalid={(e) => e.preventDefault()}
                  onBlur={emailValidateHandler}
                  onFocus={() => {
                    setEmailErrorMessage("");
                  }}
                />
                {emailErrorMessage && (
                  <div className={classes.ErrorMessageBox}>
                    {emailErrorMessage}
                  </div>
                )}
              </div>

              <div className={classes.PasswordBox}>
                <input
                  title="Password"
                  name="password"
                  value={passwordInput}
                  onChange={inputChangeHandler}
                  type={passwordType}
                  placeholder="Password"
                  className={`${classes.Input} ${
                    passwordErrorMessage ? classes.InputError : ""
                  }`}
                  onFocus={() => {
                    setPasswordErrorMessage("");
                  }}
                />
                {passwordErrorMessage && (
                  <div className={classes.ErrorMessageBox}>
                    {passwordErrorMessage}
                  </div>
                )}
                <button
                  className={classes.ShowPasswordButton}
                  onClick={handleOnClickShowPassword}
                  type="button"
                >
                  {showPassword ? (
                    <HidePasswordIcon className={classes.ShowPasswordIcon} />
                  ) : (
                    <ShowPasswordIcon className={classes.ShowPasswordIcon} />
                  )}
                </button>
              </div>
            </div>
            <div className={classes.LoginOptionsContainer}>
              <label className={classes.customCheckbox}>
                <input
                  className={`${classes.checkbox} `}
                  type="checkbox"
                  checked={remember}
                  onChange={() => {
                    setRemember((prev) => !prev);
                  }}
                />
                <span className={`${classes.checkmark}`}></span>
              </label>
              <div className={classes.RememberMeText}>Remember me</div>
              <button
                className={classes.ForgotPasswordButton}
                onClick={handleOnClickForgotPassword}
                type="button"
              >
                <div className={classes.ForgotPasswordText}>
                  Forgot Password
                </div>
              </button>
            </div>

            <button className={classes.SignInButton} type="submit">
              <div className={classes.SignInButtonText}>Sign in</div>
            </button>

            <span className={classes.PrivacyNotice}>
              This site is protected by reCAPTCHA and the Google{" "}
              <span
                className={classes.PrivacyPolicy}
                onClick={() => {
                  navigate("/privacy");
                }}
              >
                Privacy Policy
              </span>{" "}
              and{" "}
              <span
                className={classes.PrivacyPolicy}
                onClick={() => {
                  navigate("/terms");
                }}
              >
                Terms of Service
              </span>
              apply.
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

/*
TODO: 
screen sizing and adjusting
all buttons functionality 
link to policy and Terms of service 
missing fonts
make social login section into a component so it can be reused
*/

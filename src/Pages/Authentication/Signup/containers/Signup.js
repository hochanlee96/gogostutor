import { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Signup.module.css";

import LanguageSelector from "../../../../shared/components/LanguageSeletor/LanguageSelector";
import NavButtons from "../../Login/components/NavButtons";

import { ReactComponent as ChevronUp } from "../../../../shared/assets/icons/chevron-up.svg";
import { ReactComponent as ArrowRight } from "../../../../shared/assets/icons/arrow-right.svg";
import Logo from "../../../../shared/assets/icons/gogosedu-white-icon.svg";
import LogoText from "../../../../shared/assets/icons/gogos-edu-text-logo-white.svg";
import { ReactComponent as ListIcon } from "../../../../shared/assets/icons/list.svg";
import StepImage from "../../../../shared/assets/images/tutor-steps.svg";
import StepImageActive from "../../../../shared/assets/images/tutor-steps-active.svg";

import Start from "../components/Start";
import Email from "../components/Email";
import Create from "../components/Create";

const initialForm = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
};

const Signup = () => {
  const [language] = useState("English");
  const [contentStep, setContentStep] = useState("Start");
  const [form, setForm] = useState({ ...initialForm });
  const [verificationState, setVerificationState] = useState("unsent");

  const initializeForm = () => {
    setForm({ ...initialForm });
  };

  const navigate = useNavigate();
  const handleOnClickLogo = () => {
    navigate("/");
  };

  let mainContent = <div>Loading...</div>;
  let headerContent = (
    <div className={classes.headerContainer}>
      <LanguageSelector />
      <NavButtons login={false} />
    </div>
  );
  if (contentStep === "Start") {
    mainContent = <Start language={language} setContentStep={setContentStep} />;
  } else if (contentStep === "Email") {
    mainContent = (
      <Email
        language={language}
        setContentStep={setContentStep}
        form={form}
        setForm={setForm}
        verificationState={verificationState}
        setVerificationState={setVerificationState}
      />
    );
    headerContent = (
      <div className={classes.headerContainer}>
        <LanguageSelector />
        <button
          className={classes.PrevButton}
          onClick={() => {
            setContentStep("Start");
          }}
        >
          <ChevronUp className={classes.ChevronIcon} />
        </button>
        <LanguageSelector />
        <button
          className={classes.SigninButton}
          onClick={() => {
            navigate("/login");
          }}
        >
          <div className={classes.SigninText}>Sign in instead</div>
          <ArrowRight className={classes.ArrowIcon} />
        </button>
      </div>
    );
  } else if (contentStep === "Create") {
    mainContent = (
      <Create
        language={language}
        setContentStep={setContentStep}
        form={form}
        setForm={setForm}
        verificationState={verificationState}
        setVerificationState={setVerificationState}
        initializeForm={initialForm}
      />
    );
    headerContent = <LanguageSelector />;
  }

  return (
    <div className={classes.Container}>
      <div
        className={`${classes.LeftContainer} ${
          contentStep === "Create" ? classes.HideLeft : ""
        }`}
      >
        <div className={classes.logoContainer} onClick={handleOnClickLogo}>
          <img alt="logo" src={Logo} />
          <img alt="logo" src={LogoText} />
        </div>
        <div className={classes.stepImageContainer}>
          <div className={classes.stepBox}>
            <div className={classes.listWrapper}>
              <ListIcon stye={{ fill: "inherit" }} />
            </div>
            {contentStep === "Start" ? (
              <img alt="steps" src={StepImage} />
            ) : (
              <img alt="steps" src={StepImageActive} />
            )}
          </div>
          <div className={classes.stepText}> Reimagining online tutoring</div>
        </div>
      </div>
      <div
        className={`${classes.RightContainer} ${
          contentStep === "Create" ? classes.FullWidth : ""
        }`}
      >
        {headerContent}
        {mainContent}
      </div>
    </div>
  );
};

export default Signup;

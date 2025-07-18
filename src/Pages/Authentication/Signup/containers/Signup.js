import { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Signup.module.css";

import LanguageSelector from "../../../../shared/components/LanguageSeletor/LanguageSelector";
import NavButtons from "../../Login/components/NavButtons";

import { ReactComponent as ChevronUp } from "../../../../shared/assets/icons/chevron-up.svg";
import { ReactComponent as ArrowRight } from "../../../../shared/assets/icons/arrow-right.svg";
import Logo from "../../../../shared/assets/icons/gogos-edu-text-logo-white.svg";
import PhoneMockup from "../../../../shared/assets/icons/phone-mockup.svg";

import Start from "../components/Start";
import Email from "../components/Email";
import Create from "../components/Create";

const Signup = () => {
  const [language] = useState("English");
  const [contentStep, setContentStep] = useState("Start");
  const [form, setForm] = useState({ email: "", password: "" });
  const [verificationState, setVerificationState] = useState("unsent");

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
        <button className={classes.GogosLogo}>
          <img alt="logo" src={Logo} onClick={handleOnClickLogo} />
        </button>
        <p className={classes.Header}>
          Sign up <br /> and start learning
        </p>
        <div className={classes.SubText}>Available on mobile</div>
        <img alt="mockup" src={PhoneMockup} />
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

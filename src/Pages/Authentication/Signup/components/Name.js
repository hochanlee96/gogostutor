import { useState, useEffect, useCallback } from "react";
// import StepNavigator from "./StepNavigator";
import classes from "./Name.module.css";

const defaultPlaceholder = {
  firstName: "Maria",
  lastName: "Curie",
};
const Name = ({
  form,
  setForm,
  setContentStep,
  setIndexStep,
  initializeForm,
}) => {
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);
  const [firstName, setFirstName] = useState(form.firstName);
  const [lastName, setLastName] = useState(form.lastName);
  const [error, setError] = useState(false);

  const iputChangeHandler = (event) => {
    setError(false);
    if (event.target.name === "firstName") {
      setFirstName(event.target.value);
    } else {
      setLastName(event.target.value);
    }
  };
  const handleExit = () => {
    initializeForm();
    setContentStep("Start");
  };
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!firstName || !lastName) {
        setError(true);
      } else {
        setForm((prev) => {
          return { ...prev, firstName: firstName, lastName: lastName };
        });
        setIndexStep((prev) => prev + 1);
      }
    },
    [firstName, lastName, setForm, setIndexStep]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!error && e.key === "Enter") {
        handleSubmit(e);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [error, handleSubmit]);
  return (
    <>
      <div className={classes.MainContainer}>
        <div className={classes.Index}>3 of 6</div>
        <div className={classes.ContentBox}>
          <div className={classes.Question}>
            {" "}
            What's your full name?<sup>*</sup>
          </div>
          <form className={classes.FormBox} onSubmit={handleSubmit}>
            <div className={classes.NamesContainer}>
              <div
                className={`${classes.NameBox} ${
                  error ? (!firstName ? classes.NameBoxError : "") : ""
                }`}
              >
                <div className={classes.NameText}>First</div>
                <input
                  className={`${classes.NameInput} ${
                    error ? (!firstName ? classes.NameInputError : "") : ""
                  }`}
                  placeholder={placeholder.firstName}
                  name="firstName"
                  value={firstName}
                  onChange={iputChangeHandler}
                  onFocus={() => {
                    setError(false);
                    setPlaceholder({ firstName: "", lastName: "" });
                  }}
                  onBlur={() => {
                    if (!firstName || !lastName) {
                      setError(true);
                      setPlaceholder(defaultPlaceholder);
                    }
                  }}
                />
              </div>
              <div
                className={`${classes.NameBox} ${
                  error ? (!lastName ? classes.NameBoxError : "") : ""
                }`}
              >
                <div className={classes.NameText}>Last</div>
                <input
                  className={`${classes.NameInput} ${
                    error ? (!lastName ? classes.NameInputError : "") : ""
                  }`}
                  placeholder={placeholder.lastName}
                  name="lastName"
                  value={lastName}
                  onChange={iputChangeHandler}
                  onFocus={() => {
                    setError(false);
                    setPlaceholder({ firstName: "", lastName: "" });
                  }}
                  onBlur={() => {
                    if (!lastName || !firstName) {
                      setError(true);
                      setPlaceholder(defaultPlaceholder);
                    }
                  }}
                />
              </div>
            </div>
            <div className={classes.ButtonContainer}>
              <button
                className={classes.Button}
                type="submit"
                disabled={!!error}
              >
                OK
              </button>
              {error ? (
                <div className={`${classes.PressText} ${classes.ErrorText}`}>
                  {"Please enter your name above."}
                </div>
              ) : (
                <div className={classes.PressText}>
                  press <b>Enter</b>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className={classes.NavButtons}>
        <button
          className={`${classes.NavButton} ${classes.NavButtonPrev}`}
          onClick={() => {
            setIndexStep((prev) => prev - 1);
          }}
        >
          Previous
        </button>

        <button className={`${classes.NavButton} ${classes.NavButtonExit}`}>
          <div
            onClick={() => {
              initializeForm();
              setContentStep("Start");
            }}
          >
            Exit sign up
          </div>
        </button>
      </div>
    </>
  );
};

export default Name;

//todo:
//1. build error display logic. perhaps error message could replace "press enter" text
//

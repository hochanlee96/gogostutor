import { useState, useEffect, useCallback } from "react";
import { ReactComponent as SlashIcon } from "../../../../shared/assets/icons/slash.svg";
// import StepNavigator from "./StepNavigator";
import classes from "./DOB.module.css";

const defaultPlaceholder = {
  month: "1",
  day: "1",
  year: "1900",
};
const Name = ({
  form,
  setForm,
  setContentStep,
  setIndexStep,
  createAccount,
  initializeForm,
}) => {
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);
  const [month, setMonth] = useState(defaultPlaceholder.month);
  const [day, setDay] = useState(defaultPlaceholder.day);
  const [year, setYear] = useState(defaultPlaceholder.year);
  const [error, setError] = useState(false);

  const iputChangeHandler = (event) => {
    setError(false);
    if (event.target.name === "month") {
      setMonth(event.target.value);
    } else if (event.target.name === "day") {
      setDay(event.target.value);
    } else {
      setYear(event.target.value);
    }
  };
  const handleExit = () => {
    setForm({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    });
    setContentStep("Start");
  };
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      //validate properly
      if (!month || !day || !year) {
        setError(true);
      } else {
        const dob = year + "-" + month + "-" + day;
        setForm((prev) => {
          return { ...prev, dateOfBirth: dob };
        });
        createAccount({ ...form, dateOfBirth: dob });
      }
    },
    [day, month, year, form, setForm, createAccount]
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
            When is your birthday?<sup>*</sup>
          </div>
          <form className={classes.FormBox} onSubmit={handleSubmit}>
            <div className={classes.NamesContainer}>
              <div className={`${classes.NameBox}`}>
                <div className={classes.NameText}>Month</div>
                <input
                  className={`${classes.NameInput}`}
                  placeholder={placeholder.month}
                  name="month"
                  value={month}
                  onChange={iputChangeHandler}
                  onFocus={() => {
                    setError(false);
                    setPlaceholder({ month: "", day: "", year: "" });
                  }}
                />
              </div>
              <SlashIcon className={classes.slashIcon} />
              <div className={`${classes.NameBox}`}>
                <div className={classes.NameText}>Day</div>
                <input
                  className={`${classes.NameInput}`}
                  placeholder={placeholder.lastName}
                  name="day"
                  value={day}
                  onChange={iputChangeHandler}
                  onFocus={() => {
                    setError(false);
                    setPlaceholder({ month: "", day: "", year: "" });
                  }}
                />
              </div>
              <SlashIcon className={classes.slashIcon} />
              <div className={`${classes.NameBox}`} style={{ width: "100px" }}>
                <div className={classes.NameText}>Year</div>
                <input
                  className={`${classes.NameInput}`}
                  placeholder={placeholder.year}
                  name="year"
                  value={year}
                  onChange={iputChangeHandler}
                  onFocus={() => {
                    setError(false);
                    setPlaceholder({ month: "", day: "", year: "" });
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

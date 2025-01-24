import { useState, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";

import api from "../../../customFetch";

const defaultStartTime = new Date(
  new Date().setHours(new Date().getHours() + 1)
);
const defaultEndTime = new Date(new Date().setHours(new Date().getHours() + 2));
const AvailabilityFormBox = () => {
  const auth = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    startTime: {
      year: defaultStartTime.getFullYear(),
      month: defaultStartTime.getMonth() + 1,
      date: defaultStartTime.getDate(),
      hour: defaultStartTime.getHours(),
      minute: "00",
    },
    endTime: {
      year: defaultEndTime.getFullYear(),
      month: defaultEndTime.getMonth() + 1,
      date: defaultEndTime.getDate(),
      hour: defaultEndTime.getHours(),
      minute: "00",
    },
  });

  const inputChangeHandler = (e) => {
    const fields = e.target.name.split("-");
    if (fields[0] === "start") {
      setFormData((prev) => {
        return {
          ...prev,
          startTime: { ...prev.startTime, [fields[1]]: e.target.value },
        };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          endTime: { ...prev.startTime, [fields[1]]: e.target.value },
        };
      });
    }
  };

  const validator = (data) => {
    const startTime = new Date(
      data.startTime.year,
      data.startTime.month - 1,
      data.startTime.date,
      data.startTime.hour,
      data.startTime.minute
    );
    const endTime = new Date(
      data.endTime.year,
      data.endTime.month - 1,
      data.endTime.date,
      data.endTime.hour,
      data.endTime.minute
    );
    return endTime - startTime > 3599999;
  };

  validator(formData);

  const addAvailabilityHandler = async (e) => {
    e.preventDefault();
    const valid = validator(formData);
    if (valid) {
      // Add new availability to the backend here
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/tutors/${auth.id}/availabilities`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (response) {
        setIsAdding(false);
      }
    } else {
      alert("Check your input! ");
    }
  };

  const newAvailabilityForm = (
    <form onSubmit={addAvailabilityHandler}>
      <div>
        <label>Start time</label>
        <input
          onChange={inputChangeHandler}
          name="start-year"
          type="number"
          value={formData.startTime.year}
        />
        <input
          onChange={inputChangeHandler}
          name="start-month"
          type="number"
          value={formData.startTime.month}
        />
        <input
          onChange={inputChangeHandler}
          name="start-date"
          type="number"
          value={formData.startTime.date}
        />
        <input
          onChange={inputChangeHandler}
          name="start-hour"
          type="number"
          value={formData.startTime.hour}
        />
        <input
          onChange={inputChangeHandler}
          name="start-minute"
          type="number"
          value={formData.startTime.minute}
        />
      </div>
      <div>
        <label> End time</label>
        <input
          onChange={inputChangeHandler}
          name="end-year"
          type="number"
          value={formData.endTime.year}
        />
        <input
          onChange={inputChangeHandler}
          name="end-month"
          type="number"
          value={formData.endTime.month}
        />
        <input
          onChange={inputChangeHandler}
          name="end-date"
          type="number"
          value={formData.endTime.date}
        />
        <input
          onChange={inputChangeHandler}
          name="end-hour"
          type="number"
          value={formData.endTime.hour}
        />
        <input
          onChange={inputChangeHandler}
          name="end-minute"
          type="number"
          value={formData.endTime.minute}
        />
      </div>
      <button>Submit</button>
    </form>
  );
  return (
    <div>
      {isAdding ? newAvailabilityForm : null}
      <button
        onClick={() => {
          setIsAdding((prev) => !prev);
        }}
      >
        {isAdding ? "Cancel" : "Add new availibility"}
      </button>
    </div>
  );
};

export default AvailabilityFormBox;

import React, { useEffect, useState, useContext, useCallback } from "react";
import classes from "./Payout.module.css";

import { API_GetCreditData, API_Payout } from "../../../API";
import { AuthContext } from "../../../shared/context/auth-context";

const Payout = () => {
  const [transferData, setTransferData] = useState([]);
  const [creditData, setCreditData] = useState([]);
  const auth = useContext(AuthContext);
  const getCreditData = useCallback(async () => {
    try {
      const response = await API_GetCreditData(auth.id, auth.accessToken);
      const data = await response.json();
      if (data.status === 200) {
        setCreditData(data.credits);
      }
    } catch (error) {
      console.log(error);
    }
  }, [auth.accessToken, auth.id]);
  useEffect(() => {
    // Simulating an asynchronous data fetch
    const fetchData = async () => {
      const dummyData = [
        {
          date: "Feb 25",
          name: "Savannah Nguyen",
          account: "****4112",
          amount: "$700",
        },
        {
          date: "Feb 25",
          name: "Savannah Nguyen",
          account: "****4112",
          amount: "$700",
        },
        {
          date: "Feb 25",
          name: "Savannah Nguyen",
          account: "****4112",
          amount: "$700",
        },
        {
          date: "Feb 25",
          name: "Savannah Nguyen",
          account: "****4112",
          amount: "$700",
        },
        {
          date: "Feb 25",
          name: "Savannah Nguyen",
          account: "****4112",
          amount: "$700",
        },
      ];
      setTransferData(dummyData);
    };

    fetchData();
    getCreditData();
  }, [getCreditData]);

  const handlePayout = async () => {
    try {
      const response = await API_Payout(
        auth.id,
        { amount: 10 },
        auth.accessToken
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Manage Your Payout</h1>
      <div className={classes.summary}>
        <div className={classes.summaryItem}>
          <p className={classes.label}>Total Credits</p>
          <p className={classes.value}>{creditData}</p>
        </div>
        <div className={classes.summaryItem}>
          <p className={classes.label}>Total Transfer amount</p>
          <p className={classes.value}></p>
        </div>
      </div>
      <div className={classes.tableContainer}>
        <div className={classes.tableHeader}>
          <p className={classes.tableTitle}>Transfer this month</p>
          <a href="/" className={classes.viewDetail}>
            View Detail &gt;
          </a>
        </div>

        <div className={classes.tableBody}>
          {transferData.map((transfer, index) => (
            <div key={index} className={classes.tableRow}>
              <p className={classes.date}>{transfer.date}</p>
              <p className={classes.name}>{transfer.name}</p>
              <p className={classes.account}>{transfer.account}</p>
              <p className={classes.amount}>{transfer.amount}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handlePayout}>Request Payout</button>
    </div>
  );
};

export default Payout;

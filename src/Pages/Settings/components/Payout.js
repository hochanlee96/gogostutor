import React, { useEffect, useState } from "react";
import classes from "./Payout.module.css";

const Payout = () => {
  const [transferData, setTransferData] = useState([]);

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
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Manage Your Payout</h1>

      <div className={classes.summary}>
        <div className={classes.summaryItem}>
          <p className={classes.label}>Total Balance</p>
          <p className={classes.value}>$ 17,000</p>
        </div>
        <div className={classes.summaryItem}>
          <p className={classes.label}>Total Transfer amount</p>
          <p className={classes.value}>$ 9,000</p>
        </div>
      </div>

      <div className={classes.tableContainer}>
        <div className={classes.tableHeader}>
          <p className={classes.tableTitle}>Transfer this month</p>
          <a href="#" className={classes.viewDetail}>
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
    </div>
  );
};

export default Payout;

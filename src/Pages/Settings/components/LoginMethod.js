import React, { useState } from "react";
import classes from "./LoginMethod.module.css";

const LoginMethod = () => {
  const [loginMethods, setLoginMethods] = useState([
    { name: "Facebook", icon: "facebook.png", connected: false },
    { name: "Google", icon: "google.png", connected: false },
    { name: "Apple", icon: "apple.png", connected: false },
    { name: "WeChat", icon: "wechat.png", connected: false },
  ]);

  const toggleConnection = (index) => {
    const updatedMethods = [...loginMethods];
    updatedMethods[index].connected = !updatedMethods[index].connected;
    setLoginMethods(updatedMethods);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Your Login Method</h1>

      {loginMethods.map((method, index) => (
        <div key={method.name} className={classes.row}>
          <div className={classes.info}>
            <img
              src={method.icon} // Replace with actual imported image
              alt={method.name}
              className={classes.icon}
            />
            <div>
              <p className={classes.methodName}>{method.name}</p>
              <p
                className={
                  method.connected
                    ? classes.statusConnected
                    : classes.statusDisconnected
                }
              >
                {method.connected ? "Connected" : "Disconnected"}
              </p>
            </div>
          </div>
          <button
            className={`${classes.button} ${
              method.connected
                ? classes.connectedButton
                : classes.disconnectedButton
            }`}
            onClick={() => toggleConnection(index)}
          >
            {method.connected ? "Connected" : "Disconnected"}
          </button>
        </div>
      ))}

      <button className={classes.saveButton}>Save all changes</button>
    </div>
  );
};

export default LoginMethod;

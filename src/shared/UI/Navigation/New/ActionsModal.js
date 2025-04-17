import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/auth-context";

import classes from "./ActionsModal.module.css";

const ActionsModal = ({ setIsOpen, email }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.darkBG} onClick={() => setIsOpen(false)} />
      <div className={classes.modal}>
        <div className={classes.ActionsBox}>
          <div
            className={classes.ActionButton}
            onClick={() => {
              navigate("/dashboard");
              setIsOpen(false);
            }}
          >
            Dashboard
          </div>
          <div
            className={classes.ActionButton}
            onClick={() => {
              navigate("/account-settings");
              setIsOpen(false);
            }}
          >
            Account Settings
          </div>
          <div
            className={classes.ActionButton}
            onClick={() => {
              navigate("/messages");
              setIsOpen(false);
            }}
          >
            Messages
          </div>
          <div
            className={classes.ActionButton}
            onClick={() => {
              navigate("/schedule");
              setIsOpen(false);
            }}
          >
            Calendar
          </div>
          <div className={classes.ActionButton}>Invite a friend</div>
        </div>
        <div
          className={classes.SignoutBox}
          onClick={() => {
            auth.logout();
            setIsOpen(false);
          }}
        >
          <div>Sign out</div>
          <div>{email}</div>
        </div>
      </div>
    </>
  );
};

export default ActionsModal;

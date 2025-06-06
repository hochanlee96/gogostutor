import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import ActionsModal from "./ActionsModal";

import classes from "./AuthComponents.module.css";

import { AuthContext } from "../../../context/auth-context";
import { UserContext } from "../../../context/user-context";

import { FaExclamation, FaBell, FaComment } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

import emptyUserImage from "../../../../shared/assets/icons/user.png";

const AuthComponents = ({ isLoggedIn }) => {
  const [newMessage, setNewMessage] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const socket = useContext(AuthContext).socket;
  const user = useContext(UserContext);
  const profile =
    user && user.profile
      ? user.profile
      : { firstName: "user", lastName: "user" };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (socket) {
      socket.on("message", (chatData) => {
        if (location.pathname !== "/messages") {
          setNewMessage(true);
        }
      });
    }
  }, [socket, location.pathname]);

  let contents = null;
  if (isLoggedIn) {
    contents = (
      <ul className={classes.NavLinks}>
        <li>
          <div
            className={classes.UtilityButton}
            onClick={() => {
              setNewMessage(false);
              // navigate("/messages");
            }}
          >
            <FaBell size="20px" />
          </div>
        </li>
        <li>
          <div
            className={classes.UtilityButton}
            onClick={() => {
              setNewMessage(false);
              navigate("/messages");
            }}
          >
            {/* {newMessage && location.pathname !== "/messages" ? "New " : ""}
            messaages */}
            <FaComment size="20px" />
          </div>
        </li>
        <li>
          <div
            className={classes.UtilityButton}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <MdSpaceDashboard size="20px" />
          </div>
        </li>
        <li>
          <div onClick={() => setModalOpen(true)}>
            {profile && profile.imageURL ? (
              <img className={classes.UserIcon} src={profile.imageURL} alt="" />
            ) : (
              <img className={classes.UserIcon} src={emptyUserImage} alt="" />
            )}
            {/* <img
              className={classes.UserIcon}
              src={profile.imageURL || emptyUserImage}
              alt="profile_Image"
            /> */}
          </div>
          {modalOpen ? (
            <ActionsModal setIsOpen={setModalOpen} email={profile.email} />
          ) : null}
        </li>
        {/* <li>
              <button onClick={logoutHandler}>Logout</button>
            </li> */}
      </ul>
    );
  } else {
    contents = (
      <ul className={classes.AuthButtons}>
        <li style={{ fontSize: "20px" }}>
          <NavLink to="/login">Log in</NavLink>
        </li>
        <li className={classes.JoinUs} style={{ fontSize: "20px" }}>
          <NavLink to="/signup">Join Us</NavLink>
        </li>
      </ul>
    );
  }
  return <>{contents}</>;
};

export default AuthComponents;

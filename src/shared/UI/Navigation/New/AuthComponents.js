import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import ActionsModal from "./ActionsModal";

import classes from "./AuthComponents.module.css";

import { AuthContext } from "../../../context/auth-context";
import { ProfileContext } from "../../../context/profile-context";

import { FaExclamation, FaBell, FaComment } from "react-icons/fa";
import emptyUserImage from "../../../../shared/assets/icons/user.png";

const AuthComponents = ({ isLoggedIn, verified }) => {
  const [newMessage, setNewMessage] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const socket = useContext(AuthContext).socket;
  const profile = useContext(ProfileContext);
  const profileData =
    profile.userData && profile.userData.profile
      ? profile.userData.profile
      : null;
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
        {verified ? null : (
          <li>
            <div
              onClick={() => {
                navigate("/verify-email");
              }}
              className={classes.VerifyMessage}
            >
              <FaExclamation size="20px" />
            </div>
          </li>
        )}
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
          <div onClick={() => setModalOpen(true)}>
            {profileData && profileData.firstName ? (
              <img
                className={classes.UserIcon}
                src={emptyUserImage}
                alt="profile_Image"
              />
            ) : (
              "user"
            )}
          </div>
          {modalOpen ? (
            <ActionsModal setIsOpen={setModalOpen} email={profileData.email} />
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
        <li>
          <NavLink to="/login">Log in</NavLink>
        </li>
        <li className={classes.JoinUs}>
          <NavLink to="/signup">Join Us</NavLink>
        </li>
      </ul>
    );
  }
  return <>{contents}</>;
};

export default AuthComponents;

import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import ActionsModal from "./ActionsModal";

import classes from "./AuthComponents.module.css";

import { AuthContext } from "../../../context/auth-context";
import { ProfileContext } from "../../../context/profile-context";

const AuthComponents = ({ isLoggedIn, verified }) => {
  const [newMessage, setNewMessage] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const socket = useContext(AuthContext).socket;
  const profile = useContext(ProfileContext).profileData;
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
            >
              Verify your email!
            </div>
          </li>
        )}
        <li>
          <div
            className={classes.UtilityButton}
            onClick={() => {
              setNewMessage(false);
              navigate("/messages");
            }}
          >
            {newMessage && location.pathname !== "/messages" ? "New " : ""}
            messaages
          </div>
        </li>
        <li>
          <div onClick={() => setModalOpen(true)}>
            {profile.firstName && profile.lastName
              ? profile.firstName
              : profile.email}
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

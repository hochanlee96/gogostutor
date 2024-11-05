import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";

import ActionsModal from "../ActionsModal";

import classes from "./NavLinksTest.module.css";

const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const socket = auth.socket;

  const location = useLocation();

  useEffect(() => {
    if (socket) {
      socket.on("message", (chatData) => {
        if (location.pathname !== "/tutor/messages") {
          setNewMessage(true);
        }
      });
    }
  }, [socket, location.pathname]);

  const logoutHandler = () => {
    auth.logout();
    navigate("/");
  };

  let links;
  if (auth.isLoggedIn) {
    links = (
      <ul className={classes.NavLinkSet}>
        <li>
          <ul className={classes.NavLinks}>
            <li>
              <NavLink to="/tutor/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/tutor/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/tutor/my-subjects">Subjects</NavLink>
            </li>
            <li>
              <NavLink to="/tutor/schedule">Schedule</NavLink>
            </li>
          </ul>
        </li>
        <li>
          <ul className={classes.NavLinks}>
            {auth.verified ? null : (
              <li>
                <div
                  className={classes.UtilityButton}
                  onClick={() => {
                    navigate("/tutor/test");
                  }}
                >
                  Verify you email!
                </div>
              </li>
            )}
            <li>
              <div
                className={classes.UtilityButton}
                onClick={() => {
                  setNewMessage(false);
                  navigate("/tutor/messages");
                }}
              >
                {newMessage && location.pathname !== "/tutor/messages"
                  ? "New "
                  : ""}
                messaages
              </div>
            </li>
            <li>
              <div
                className={classes.UtilityButton}
                onClick={() => setIsOpen(true)}
              >
                {auth.firstName && auth.lastName ? auth.firstName : auth.email}
              </div>
              {isOpen ? (
                <ActionsModal
                  setIsOpen={setIsOpen}
                  email={auth.email}
                  logoutHandler={logoutHandler}
                />
              ) : null}
            </li>
            {/* <li>
              <button onClick={logoutHandler}>Logout</button>
            </li> */}
          </ul>
        </li>
      </ul>
    );
  } else {
    links = (
      <ul className={classes.NavLinkSet}>
        <li>
          <ul className={classes.NavLinks}>
            <li>
              <NavLink to="/">About</NavLink>
            </li>
            <li>
              <NavLink to="/">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/">Instructor</NavLink>
            </li>
            <li>
              <NavLink to="/">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/">Contact</NavLink>
            </li>
          </ul>
        </li>
      </ul>
    );
  }

  return links;
};

export default NavLinks;

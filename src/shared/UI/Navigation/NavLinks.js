import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import ActionsModal from "./ActionsModal";

import classes from "./NavLinks.module.css";

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
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/my-subjects">Subjects</NavLink>
            </li>
            <li>
              <NavLink to="/schedule">Schedule</NavLink>
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
                    navigate("/test");
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
                  navigate("/messages");
                }}
              >
                {newMessage && location.pathname !== "/messages" ? "New " : ""}
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
          </ul>
        </li>
        <li>
          <ul className={classes.NavLinks}>
            <li>
              <NavLink to="/login">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign up</NavLink>
            </li>
          </ul>
        </li>
      </ul>
    );
  }

  return links;
};

export default NavLinks;

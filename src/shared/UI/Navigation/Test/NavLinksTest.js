import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../../context/auth-context";

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
        if (location.pathname !== "/messages") {
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

import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../context/auth-context";

import classes from "./NavLinks.module.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);

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

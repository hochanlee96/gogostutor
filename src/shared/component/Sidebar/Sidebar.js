import React from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaComment,
  FaMoneyBill,
  FaBell,
  FaCog,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

import classes from "./Sidebar.module.css"; // Importing CSS module
import GogosLogo from "../../assets/icons/GogosEdu_icon_text_logo.svg";

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <div className={`${classes.sidebar} ${collapsed ? classes.collapsed : ""}`}>
      {!collapsed && (
        <div className={classes.logoContainer}>
          <img className={classes.logo} src={GogosLogo} alt="" />
        </div>
      )}
      <button
        className={classes.toggleButton}
        onClick={() => {
          setCollapsed((prev) => !prev);
        }}
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      <ul className={classes.menu}>
        <li>
          <FaHome className={classes.icon} />
          {!collapsed && <span>Home</span>}
        </li>
        <li>
          <FaCalendarAlt className={classes.icon} />
          {!collapsed && <span>Calender</span>}
        </li>
        <li>
          <FaChalkboardTeacher className={classes.icon} />
          {!collapsed && <span>Classroom</span>}
        </li>
        <li>
          <FaComment className={classes.icon} />
          {!collapsed && <span>Message</span>}
        </li>
        <li>
          <FaMoneyBill className={classes.icon} />
          {!collapsed && <span>Payment</span>}
        </li>
      </ul>
      <div className={classes.divider}></div>
      <ul className={classes.menu}>
        <li>
          <FaBell className={classes.icon} />
          {!collapsed && <span>Notification</span>}
        </li>
        <li>
          <FaCog className={classes.icon} />
          {!collapsed && <span>Setting</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

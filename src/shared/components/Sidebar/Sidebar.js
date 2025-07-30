import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
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

import { MdSpaceDashboard } from "react-icons/md";

import classes from "./Sidebar.module.css"; // Importing CSS module
import GogosLogo from "../../assets/icons/GogosEdu_icon_text_logo.svg";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

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
        <li
          className={`${pathname === "/dashboard" ? classes.menuActive : ""}`}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <MdSpaceDashboard className={classes.icon} />
          {!collapsed && <span>Dashboard</span>}
        </li>
        <li
          className={`${pathname === "/schedule" ? classes.menuActive : ""}`}
          onClick={() => {
            navigate("/schedule");
          }}
        >
          <FaCalendarAlt className={classes.icon} />
          {!collapsed && <span>Calender</span>}
        </li>
        <li
          className={`${pathname === "/classroom" ? classes.menuActive : ""}`}
          onClick={() => {
            navigate("/classroom");
          }}
        >
          <FaChalkboardTeacher className={classes.icon} />
          {!collapsed && <span>Classroom</span>}
        </li>
        <li
          className={`${pathname === "/messages" ? classes.menuActive : ""}`}
          onClick={() => {}}
        >
          <FaComment className={classes.icon} />
          {!collapsed && <span>Message</span>}
        </li>
        <li
          className={`${pathname === "/payment" ? classes.menuActive : ""}`}
          onClick={() => {}}
        >
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
        <li
          onClick={() => {
            navigate("/account-settings");
          }}
        >
          <FaCog className={classes.icon} />
          {!collapsed && <span>Setting</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import { useNavigate } from "react-router-dom";

import classes from "./SettingBox.module.css";

import { MdFace } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";
import { MdSignpost } from "react-icons/md";
import { MdPayments } from "react-icons/md";

import { MdKeyboardArrowRight } from "react-icons/md";

const SettingBox = ({ title, description, iconName, link }) => {
  const navigate = useNavigate();
  let icon;
  switch (iconName) {
    case "MdFace":
      icon = <MdFace size="20px" />;
      break;
    case "MdAccountCircle":
      icon = <MdAccountCircle size="20px" />;
      break;
    case "MdVpnKey":
      icon = <MdVpnKey size="20px" />;
      break;
    case "IoIosSettings":
      icon = <IoIosSettings size="20px" />;
      break;
    case "FaEnvelope":
      icon = <FaEnvelope size="20px" />;
      break;
    case "FaRegCalendar":
      icon = <FaRegCalendar size="20px" />;
      break;
    case "MdSignpost":
      icon = <MdSignpost size="20px" />;
      break;
    case "MdPayments":
      icon = <MdPayments size="20px" />;
      break;
    default:
      icon = <MdFace />;
  }
  return (
    <div className={classes.SettingBox} onClick={() => navigate(link)}>
      {icon}
      <div className={classes.TitleRow}>
        <div>{title}</div> <MdKeyboardArrowRight />
      </div>
      <div className={classes.DescriptionText}>{description}</div>
    </div>
  );
};

export default SettingBox;

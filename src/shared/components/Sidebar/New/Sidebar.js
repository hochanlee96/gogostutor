import React from "react";

import classes from "./Sidebar.module.css";

import GogosLogo from "../../../assets/icons/gogos-logo.svg";
import GogosLogoText from "../../../assets/icons/gogos-edu-text-logo-black.svg";
import UserImage from "../../../assets/icons/user-single-grey.svg";
import HomeIcon from "../../../assets/icons/home-grey.svg";
import CalendarIcon from "../../../assets/icons/calendar-grey.svg";
import ProfileIcon from "../../../assets/icons/user-single-light-grey.svg";
import MessageIcon from "../../../assets/icons/message-grey.svg";
import ClassIcon from "../../../assets/icons/class-grey.svg";
import PaymentIcon from "../../../assets/icons/payment-grey.svg";
import SettingsIcon from "../../../assets/icons/setting-grey.svg";
import DiscordIcon from "../../../assets/icons/discord-icon.svg";
import FeedbackIcon from "../../../assets/icons/feedback-icon.svg";
import HelpIcon from "../../../assets/icons/help-center-icon.svg";

export const Sidebar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <img className={classes.gogosLogo} src={GogosLogo} alt="Gogos Logo" />
        <img
          className={classes.gogosLogoText}
          src={GogosLogoText}
          alt="Gogos Logo Text"
        />
      </div>
      <div className={classes.sideBarContainer}>
        <div className={classes.mainContainer}>
          <div className={classes.userInfoContainer}>
            <div className={classes.profilePictureContainer}>
              <div className={classes.user}>
                <div className={classes.avatarImage}>
                  <img
                    className={classes.userImage}
                    src={UserImage}
                    alt="User Avatar"
                  />
                </div>
              </div>
            </div>
            <div className={classes.userNameAndInfoContainer}>
              <div className={classes.userInfoTextContainer}>
                <div className={classes.userName}>Hello Marline B.</div>
                <div className={classes.userTitle}>AP Biology Teacher</div>
              </div>
            </div>
          </div>
          <div className={classes.menuContainer}>
            <div className={classes.menuRow}>
              <div
                className={`${classes.menuButton} ${classes.menuButtonTopLeft}`}
              >
                <div className={classes.menuIconContainer}>
                  <img
                    className={classes.menuIcon}
                    alt="Vector"
                    src={HomeIcon}
                  />
                </div>
                <div className={classes.menuText}>Home</div>
              </div>
              <div
                className={`${classes.menuButton} ${classes.menuButtonTopRight}`}
              >
                <div className={classes.menuIconContainer}>
                  <img
                    className={classes.menuIcon}
                    alt="Vector"
                    src={CalendarIcon}
                  />
                </div>
                <div className={classes.menuText}>Calendar</div>
              </div>
            </div>
            <div className={classes.menuRow}>
              <div
                className={`${classes.menuButton} ${classes.menuButtonMiddleLeft}`}
              >
                <div className={classes.menuIconContainer}>
                  <img
                    className={classes.menuIcon}
                    alt="Vector"
                    src={ProfileIcon}
                  />
                </div>
                <div className={classes.menuText}>profile</div>
              </div>
              <div className={classes.menuButton}>
                <div className={classes.menuIconContainer}>
                  <img
                    className={classes.menuIcon}
                    alt="Vector"
                    src={MessageIcon}
                  />
                </div>
                <div className={classes.menuText}>Message</div>
              </div>
            </div>
            <div className={classes.menuRow}>
              <div
                className={`${classes.menuButton} ${classes.menuButtonMiddleLeft}`}
              >
                <div className={classes.menuIconContainer}>
                  <img
                    className={classes.menuIcon}
                    alt="Vector"
                    src={ClassIcon}
                  />
                </div>
                <div className={classes.menuText}>Class</div>
              </div>
              <div className={classes.menuButton}>
                <div className={classes.menuIconContainer}>
                  <img
                    className={classes.menuIcon}
                    alt="Vector"
                    src={MessageIcon}
                  />
                </div>
                <div className={classes.menuText}>Message</div>
              </div>
            </div>
            <div className={classes.menuRow}>
              <div
                className={`${classes.menuButton} ${classes.menuButtonBottomLeft}`}
              >
                <div className={classes.menuIconContainer}>
                  <img
                    className={classes.menuIcon}
                    alt="Vector"
                    src={PaymentIcon}
                  />
                </div>
                <div className={classes.menuText}>Payment</div>
              </div>
              <div
                className={`${classes.menuButton} ${classes.menuButtonBottomRight}`}
              >
                <div className={classes.menuIconContainer}>
                  <img
                    className={classes.menuIcon}
                    alt="Vector"
                    src={SettingsIcon}
                  />
                </div>
                <div className={classes.menuText}>Setting</div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.bottomButtons}>
            <div className={classes.bottomButton}>
                <img className={classes.bottomButtonIcon} src={DiscordIcon} alt="Discord Icon" />
                <div className={classes.bottomButtonText}>Discord Community</div>
            </div>
            <div className={classes.bottomButton}>
                <img className={classes.bottomButtonIcon} src={FeedbackIcon} alt="Feedback Icon" />
                <div className={classes.bottomButtonText}>Send feedback</div>
            </div>
            <div className={classes.bottomButton}>
                <img className={classes.bottomButtonIcon} src={HelpIcon} alt="Help Icon" />
                <div className={classes.bottomButtonText}>Help center</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

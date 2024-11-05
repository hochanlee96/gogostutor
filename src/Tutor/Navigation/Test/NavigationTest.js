import { NavLink } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinksTest";

import classes from "./NavigationTest.module.css";

import LogoImage from "./assets/GogosEdu_icon_text_logo.svg";
import SearchButton from "./assets/Search.svg";

const NavigationTest = () => {
  return (
    <MainHeader>
      <div className={classes.HeaderRows}>
        <div className={classes.TopRow}>
          <img
            className={classes.Logo}
            src={LogoImage}
            alt=""
            // onClick={homeButtonClickedHandler}
          />
          <div className={classes.SearchBarBox}>
            <input type="text" placeholder="Tutoring reinvented" />
            {/* <img className={classes.SearchButton} src={SearchButton} alt="" /> */}
          </div>
          <ul className={classes.AuthButtons}>
            <li>
              <NavLink to="/tutor/login">Log in</NavLink>
            </li>
            <li className={classes.JoinUs}>
              <NavLink to="/tutor/signup">Join Us</NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.BottomRow}>
          <nav>
            <NavLinks />
          </nav>
        </div>
      </div>
    </MainHeader>
  );
};

export default NavigationTest;

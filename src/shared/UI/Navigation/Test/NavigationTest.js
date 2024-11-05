import { useContext } from "react";
import NavLinks from "./NavLinksTest";
import AuthComponents from "./AuthComponents";

import { AuthContext } from "../../../context/auth-context";

import classes from "./NavigationTest.module.css";

import LogoImage from "./assets/GogosEdu_icon_text_logo.svg";

const NavigationTest = () => {
  const auth = useContext(AuthContext);
  return (
    <header className={classes.MainHeader}>
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
          <div className={classes.AuthComponents}>
            <AuthComponents
              isLoggedIn={auth ? auth.isLoggedIn : false}
              verified={auth ? auth.verified : false}
            />
          </div>
        </div>
        <div className={classes.BottomRow}>
          <nav>
            <NavLinks />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavigationTest;

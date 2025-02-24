import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import AuthComponents from "./AuthComponents";

import { AuthContext } from "../../../context/auth-context";

import classes from "./Navigation.module.css";

import { ReactComponent as SearchIcon } from "./assets/Search.svg";
import LogoImage from "./assets/GogosEdu_icon_text_logo.svg";

const Navigation = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header className={classes.MainHeader}>
      <div className={classes.HeaderRows}>
        <div className={classes.LogoBox}>
          {/* <img
              className={classes.Logo}
              src={LogoImage}
              alt=""
              onClick={() => {
                navigate("/");
              }}
            /> */}
          Gogos Tutor
        </div>
        {/* <div className={classes.SearchBarBox}>
          <input type="text" placeholder="Search here" />
          
        </div> */}
        <div className={classes.searchContainer}>
          <SearchIcon className={classes.searchIcon} />

          <input
            type="text"
            placeholder="Search here"
            className={classes.searchInput}
          />
        </div>
        <div className={classes.AuthComponents}>
          <AuthComponents
            isLoggedIn={auth ? auth.isLoggedIn : false}
            verified={auth ? auth.verified : false}
          />
        </div>

        {/* <div className={classes.BottomRow}>
          <nav>
            <NavLinks />
          </nav>
        </div> */}
      </div>
    </header>
  );
};

export default Navigation;

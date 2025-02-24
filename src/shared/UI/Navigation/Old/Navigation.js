import React from "react";
import { useNavigate } from "react-router-dom";

import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";

import LogoImage from "../../assets/icons/A-List_logo_rmbg.png";
import classees from "./Navigation.module.css";

const Navigation = () => {
  // const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const navigate = useNavigate();

  // const openDrawerHandler = () => {
  //   setDrawerIsOpen(true);
  // };

  // const closeDrawerHandler = () => {
  //   setDrawerIsOpen(false);
  // };

  const homeButtonClickedHandler = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      <MainHeader>
        <button
          className={classees.Navigation__menu_btn}
          // onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={classees.Logo}>
          <img
            className={classees.Logo}
            src={LogoImage}
            alt=""
            onClick={homeButtonClickedHandler}
          />
        </div>
        <nav className={classees.Navigation__header_nav}>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default Navigation;

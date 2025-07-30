import { useState, useEffect, useRef } from "react";

import classes from "./LanguageSelector.module.css";

import { ReactComponent as LanguageIcon } from "../../../shared/assets/icons/globe.svg";
import { ReactComponent as DropDown } from "../../../shared/assets/icons/chevron-down.svg";
import { ReactComponent as Check } from "../../../shared/assets/icons/check.svg";

const dropdownOption = [
  "English",
  "Español",
  "中文",
  "한국어",
  "日本語",
  "Tiếng Việt",
  "Tagalog",
  "العربية",
  "हिन्दी",
  "Français",
];
const LanguageSelector = ({ relative = false }) => {
  const [language, setLanguage] = useState("English");
  const [dropBarDown, setDropBarDown] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverElement, setHoveElement] = useState("");
  const [hoverDropDown, setHoverDropDown] = useState(false);
  const [dropDownOptions, setDropDownOptions] = useState(dropdownOption);

  const ref = useRef();

  const truncateWord = (word) => {
    return word.length > 8 ? word.substring(0, 6) : word;
  };

  const isActiveLanguage = (option) => {
    return language === option;
  };

  const onHover = (option, hovering) => {
    setHoveElement(option);
    setIsHovering(hovering);
  };

  const handleLanguageButtonClick = () => {
    setDropBarDown((prev) => !prev);
  };

  useEffect(() => {
    var newDropDown = [];
    newDropDown.push(language);
    dropdownOption.forEach((a) => {
      if (a !== language) {
        newDropDown.push(a);
      }
    });
    setDropDownOptions(newDropDown);
  }, [language]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setDropBarDown((prev) => !prev);
      }
    };

    if (dropBarDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropBarDown]);

  return (
    <div
      className={`${relative ? classes.LanguageRelative : classes.Language}`}
    >
      <button
        className={`${classes.LanguageButton} ${
          dropBarDown && classes.LanguageButtonClicked
        } ${hoverDropDown && !dropBarDown && classes.DropDownHover}
    `}
        onMouseEnter={() => setHoverDropDown(true)}
        onMouseLeave={() => setHoverDropDown(false)}
        onClick={handleLanguageButtonClick}
      >
        <LanguageIcon
          className={`${dropBarDown ? classes.IconActive : classes.Icon}`}
        />
        <div
          className={`${classes.LanguageText} ${
            dropBarDown && classes.LanguageTextActive
          }`}
        >
          {truncateWord(language)}
        </div>
        <DropDown
          className={`${
            dropBarDown ? classes.DropDownIconActive : classes.DropDownIcon
          }`}
        />
      </button>
      {dropBarDown && (
        <div className={classes.Overlay}>
          <ul className={classes.LanguageDropDown} ref={ref}>
            {dropDownOptions.map((option, index) => (
              <div
                className={classes.DropDownElementContainer}
                onMouseEnter={() => onHover(option, true)}
                onMouseLeave={() => onHover(option, false)}
              >
                <button
                  className={`${classes.DropDownElements} ${
                    isActiveLanguage(option) && classes.DropDownElementClicked
                  } ${
                    isHovering &&
                    hoverElement === option &&
                    !isActiveLanguage(option) &&
                    classes.DropDownElementOnHover
                  }
            `}
                  key={index}
                  onClick={() => {
                    setLanguage(option);
                    setDropBarDown(false);
                  }}
                >
                  <div
                    className={`${classes.DropDownElementText} ${
                      isActiveLanguage(option) &&
                      classes.DropDownElementTextActive
                    }`}
                  >
                    {option}
                  </div>
                  {isActiveLanguage(option) && (
                    <Check className={classes.BlueCheckIcon} />
                  )}
                </button>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

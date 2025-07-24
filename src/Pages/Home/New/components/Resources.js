import { useState } from "react";
import { ReactComponent as ChevronDown } from "../../../../shared/assets/icons/chevron-down.svg";
import { ReactComponent as ChevronRight } from "../../../../shared/assets/icons/chevron-right.svg";
import { ReactComponent as ArrowRight } from "../../../../shared/assets/icons/arrow-right.svg";
import { ReactComponent as Sparkle } from "../../../../shared/assets/icons/sparkle.svg";

import classes from "./Resources.module.css";

const sampleFAQs = [
  {
    title: "What is Gogos Edu",
    body: `Gogos Edu is an all-in-one online tutoring platform that connects
            students in grades 6–12 with certified, experienced tutors across a
            wide range of academic subjects — including core subjects, APs, and
            test prep.`,
  },
  {
    title: "Who are your tutors",
    body: `Gogos Edu is an all-in-one online tutoring platform that connects
            students in grades 6–12 with certified, experienced tutors across a
            wide range of academic subjects — including core subjects, APs, and
            test prep.`,
  },
  {
    title: "What subjects do you offer?",
    body: `Gogos Edu is an all-in-one online tutoring platform that connects
            students in grades 6–12 with certified, experienced tutors across a
            wide range of academic subjects — including core subjects, APs, and
            test prep.`,
  },
  {
    title: "What if I want to switch tutors?",
    body: `Gogos Edu is an all-in-one online tutoring platform that connects
            students in grades 6–12 with certified, experienced tutors across a
            wide range of academic subjects — including core subjects, APs, and
            test prep.`,
  },
  {
    title: "What subjects do you offer?",
    body: `Gogos Edu is an all-in-one online tutoring platform that connects
            students in grades 6–12 with certified, experienced tutors across a
            wide range of academic subjects — including core subjects, APs, and
            test prep.`,
  },
  {
    title: "Can I talk to the tutor before booking?",
    body: `Gogos Edu is an all-in-one online tutoring platform that connects
            students in grades 6–12 with certified, experienced tutors across a
            wide range of academic subjects — including core subjects, APs, and
            test prep.`,
  },
];

const FAQs = ({ title, body, border, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return isOpen ? (
    <div
      className={classes.questionBoxOpen}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      tabIndex="0"
    >
      <div className={classes.titleBoxOpen}>
        <ChevronDown className={classes.chevronIcon} />
        <b className={classes.questionTitleOpen}>{title}</b>
      </div>
      <div className={classes.questionTextOpen}>{body}</div>
    </div>
  ) : (
    <div
      className={`${classes.questionBox} ${
        border && !isOpen ? classes.borderBottom : ""
      }`}
      tabIndex="0"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <ChevronRight className={classes.chevronIcon} />
      <div className={classes.questionText}>{title}</div>
    </div>
  );
};

const Resources = () => {

  return (
    <div className={classes.sectionContainer}>
      <div className={classes.mainContainer}>
        <div className={classes.titleBox}>
          <div className={classes.titleText}>FAQs</div>
          <button className={classes.questionButton}>
            <Sparkle className={classes.sparkleIcon} />
            <div className={classes.buttonText}>Ask any specific questions</div>
            <ArrowRight className={classes.arrowIcon} />
          </button>
        </div>
        <div className={classes.questionsBox}>
          {sampleFAQs.map((faq, index) => (
            <FAQs
              key={index}
              title={faq.title}
              body={faq.body}
              border={sampleFAQs.length - 1 !== index}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;

import React, { useState } from "react";
import classes from "./FAQ.module.css";

const faqs = [
  {
    question: "How do I sign up as a tutor on Gogos Edu?",
    answer:
      "Once our system is ready, you will receive an invitation to join the Gogos Edu Tutor’s Portal. From there, you can create your profile by entering your available dates, basic information, and other necessary details.",
  },
  {
    question: "Are tutors bound to specific locations?",
    answer: `Tutors must be residents of, or have legal authorization to work within, the United States. All payments will be processed through US-associated banks.

You may reside in another country or region and still work with us, provided you meet the above requirements and comply with the regional laws governing where you conduct your sessions.`,
  },
  {
    question: "What subjects can I teach?",
    answer:
      "You can teach any subject within the 6-12th grade curriculum that you are qualified in. You can list your subjects on your profile during the setup process.",
  },
  {
    question: "How will I be matched with students?",
    answer:
      "Students will be able to browse tutor profiles and select based on their specific needs, such as subject, availability, and grade level. Our system may also recommend you to students based on your profile and their requirements.",
  },
  {
    question: "How do I manage my availability?",
    answer:
      "You will be able to update your available dates and times through the Gogos Edu Tutor’s Portal, ensuring that students only book sessions when you are available.",
  },
  {
    question: "How do I conduct tutoring sessions?",
    answer:
      "All sessions are conducted online through our integrated platform, once it launches on Q1 2025. This allows for seamless communication and learning experiences.",
  },
  {
    question: "Will I receive any support or materials from Gogos Edu?",
    answer:
      "Yes, a guidebook and other resources will be provided once the system is ready to help you navigate the platform and optimize your tutoring sessions.",
  },
  {
    question: "How will tutors get paid?",
    answer:
      "Tutors will get paid in our integrated online system every 2 weeks. You will be able to link your bank account and get paid electronically on our platform.",
  },
  {
    question: "Does Gogos Edu withhold any taxes?",
    answer:
      "Gogos Edu doesn't withhold taxes from your earnings. You are required to file your related taxes on each dedicate term to the respective government(s) or entities.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={classes.faqWrapper}>
      <h2 className={classes.header}>FAQ</h2>
      <div className={classes.accordion}>
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`${classes.item} ${
              openIndex === index ? classes.open : ""
            }`}
          >
            <div className={classes.question} onClick={() => toggle(index)}>
              <span>☑</span>
              <span className={classes.qText}>{item.question}</span>
              <span className={classes.arrow}>
                {openIndex === index ? "▴" : "▾"}
              </span>
            </div>
            {openIndex === index && (
              <div className={classes.answer}>{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

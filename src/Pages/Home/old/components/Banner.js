import React, { useState } from "react";
import classes from "./Banner.module.css";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 3;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className={classes.bannerWrapper}>
      <div className={classes.slider}>
        <div
          className={classes.slidesContainer}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {[...Array(totalSlides)].map((_, index) => (
            <div className={classes.slide} key={index}>
              {/* Content will go here */}
            </div>
          ))}
        </div>

        <button
          className={`${classes.navButton} ${classes.prev}`}
          onClick={handlePrev}
        >
          &#8249;
        </button>
        <button
          className={`${classes.navButton} ${classes.next}`}
          onClick={handleNext}
        >
          &#8250;
        </button>

        <div className={classes.pagination}>
          {currentSlide + 1} / {totalSlides}
        </div>
      </div>
    </div>
  );
};

export default Banner;

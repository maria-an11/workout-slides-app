import React from "react";
import "./Dots.css";

const Dots = ({ slides, currentSlide, setCurrentSlide, isLastSlide }) => {
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const getDotClass = (index) => {
    return index === currentSlide ? "dot active" : "dot";
  };

  return (
    <div className={`dot-navigation ${isLastSlide ? "show-all-active" : ""}`}>
      {slides.map((slide, index) => {
        if (!slide.image) return null;

        const isActive = index === currentSlide;
        const dotClass = getDotClass(index);
        const ariaLabel = `Go to slide ${index + 1}: ${slide.title}`;

        return (
          <button
            key={index}
            className={dotClass}
            onClick={() => handleDotClick(index)}
            aria-label={ariaLabel}
            aria-current={isActive ? "true" : undefined}
          />
        );
      })}
    </div>
  );
};

export default Dots;

import React from "react";
import PropTypes from "prop-types";
import "./SlideCard.css";

const SlideCard = ({
  title,
  text,
  image,
  currentSlide,
  handleTouchStart,
  slidesLength,
  handleTouchMove,
  handleTouchEnd,
}) => {
  return (
    <section
      className="card text-center"
      id="slide"
      aria-live="polite"
      aria-label={`Slide ${currentSlide + 1} of ${slidesLength}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slide-content">
        <h1 data-testid="title">{title}</h1>
        <p data-testid="text">{text}</p>
        {image && <img src={image} alt={title} className="slide-image" />}
      </div>
    </section>
  );
};

SlideCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
  currentSlide: PropTypes.number.isRequired,
  slidesLength: PropTypes.number.isRequired,
  handleTouchStart: PropTypes.func,
  handleTouchMove: PropTypes.func,
  handleTouchEnd: PropTypes.func,
};

export default SlideCard;

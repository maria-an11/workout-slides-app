import React from "react";
import "./Navigation.css";

const Navigation = ({
  isFirstSlide,
  isLastSlide,
  restart,
  previous,
  next,
  toggleFullscreen,
  isFullscreen,
}) => {
  const fullscreenLabel = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";

  return (
    <nav className="navigation" role="navigation" aria-label="Slide navigation">
      <button
        onClick={restart}
        disabled={isFirstSlide}
        data-testid="button-restart"
        aria-label="Restart slides"
      >
        Restart
      </button>

      <button
        onClick={previous}
        disabled={isFirstSlide}
        data-testid="button-prev"
        aria-label="Previous slide"
      >
        Prev
      </button>

      <button
        onClick={next}
        disabled={isLastSlide}
        data-testid="button-next"
        aria-label="Next slide"
      >
        Next
      </button>

      <button onClick={toggleFullscreen} aria-label={fullscreenLabel}>
        {fullscreenLabel}
      </button>
    </nav>
  );
};

export default Navigation;

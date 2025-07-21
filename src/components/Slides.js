import React, { useEffect, useCallback } from "react";
import "./Slides.css";

import Navigation from "./Navigation/Navigation";
import ProgressBar from "./ProgressBar/ProgressBar";
import Dots from "./Dots/Dots";
import SlideCard from "./SlideCard/SlideCard";

import useSwipeNavigation from "../hooks/useSwipeNavigation";
import useFullScreen from "../hooks/useFullscreen";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation";

const Slides = ({ slides, currentSlide, setCurrentSlide }) => {
  const totalSlides = slides?.length || 0;

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === totalSlides - 1;

  // Reset to first slide and clear local storage
  const restart = useCallback(() => {
    localStorage.removeItem("currentSlide");
    setCurrentSlide(0);
  }, [setCurrentSlide]);

  // Move to previous slide if possible
  const goToPrevious = useCallback(() => {
    if (!isFirstSlide) {
      setCurrentSlide((prev) => prev - 1);
    }
  }, [isFirstSlide, setCurrentSlide]);

  // Move to next slide if possible
  const goToNext = useCallback(() => {
    if (!isLastSlide) {
      setCurrentSlide((prev) => prev + 1);
    }
  }, [isLastSlide, setCurrentSlide]);

  // Fullscreen controls
  const { isFullscreen, toggleFullscreen } = useFullScreen();

  // Swipe gesture handling
  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipeNavigation({
      onSwipeLeft: goToNext,
      onSwipeRight: goToPrevious,
    });

  // Save current slide index to local storage
  useEffect(() => {
    localStorage.setItem("currentSlide", currentSlide);
  }, [currentSlide]);

  // Enable keyboard controls: arrow keys and R for restart
  useKeyboardNavigation({
    next: goToNext,
    previous: goToPrevious,
    restart,
  });

  // Handle case where there are no slides
  if (!slides || totalSlides === 0) {
    return <p>No slides available.</p>;
  }

  const current = slides[currentSlide];
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <main className="slide-container">
      <Navigation
        isFirstSlide={isFirstSlide}
        isLastSlide={isLastSlide}
        restart={restart}
        previous={goToPrevious}
        next={goToNext}
        toggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />

      <SlideCard
        title={current.title}
        text={current.text}
        image={current.image}
        currentSlide={currentSlide}
        slidesLength={totalSlides}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
      />

      <ProgressBar progressPercent={progress} />

      <Dots
        slides={slides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        isLastSlide={isLastSlide}
      />
    </main>
  );
};

export default Slides;

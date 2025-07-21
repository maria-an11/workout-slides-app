import { useState } from "react";

const useSwipeNavigation = ({ onSwipeLeft, onSwipeRight }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const swipeDistance = touchStart - touchEnd;

    if (swipeDistance > 50 && onSwipeLeft) onSwipeLeft();
    else if (swipeDistance < -50 && onSwipeRight) onSwipeRight();

    setTouchStart(null);
    setTouchEnd(null);
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};

export default useSwipeNavigation;

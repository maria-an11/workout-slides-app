import { useEffect } from "react";

const useKeyboardNavigation = ({ next, previous, restart }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") previous();
      else if (e.key === "r" || e.key === "R") restart();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [next, previous, restart]);
};

export default useKeyboardNavigation;

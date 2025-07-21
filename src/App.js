import React, { useState, useEffect } from "react";
import "./App.css";
import Slides from "./components/Slides";
import "./components/Slides.css";

function App({ slides }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [currentSlide, setCurrentSlide] = useState(() => {
    const saved = localStorage.getItem("currentSlide");
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div className="App">
      <div className="toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">
          {darkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </div>

      <Slides
        slides={slides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
}

export default App;

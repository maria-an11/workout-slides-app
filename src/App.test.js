import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import slidesData from "./data/slidesData";

test("loads dark mode preference from localStorage", () => {
  localStorage.setItem("darkMode", "true");
  render(<App slides={slidesData} />);
  localStorage.removeItem("darkMode");
});

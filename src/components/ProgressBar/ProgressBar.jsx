import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ progressPercent }) => {
  return (
    <div className="progress-bar-background">
      <div
        className="progress-bar-fill"
        style={{ width: `${progressPercent}%` }}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={progressPercent}
        role="progressbar"
      />
    </div>
  );
};

export default ProgressBar;

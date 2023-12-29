import React from "react";
import "../css/switch.css";

const Switch = ({ isChecked, setIsChecked }) => {
  const handleClick = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <div className="toggle-slide" onClick={handleClick}>
      <div className={`switch ${isChecked ? "slide " : ""}`}></div>
    </div>
  );
};

export default Switch;

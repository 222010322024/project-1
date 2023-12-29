import React from "react";
import "../css/button.css";
const Button = ({ text, cName }) => {
  return (
    // <div className="btn">
    //   <span>Delete filtered data</span>
    // </div>
    <button className={`btn ${cName}`}>{text}</button>
  );
};

export default Button;

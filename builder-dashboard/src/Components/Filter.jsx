import React from "react";
import Switch from "./Switch";
import "../css/filter.css";
import Button from "./Button";
const Filter = ({ isChecked, setIsChecked }) => {
  return (
    <div className="filter">
      <div className="toggle">
        <Switch isChecked={isChecked} setIsChecked={setIsChecked} />
        <div className="desc">show only remaining to be revised</div>
      </div>
      <div className="btns">
        <Button cName={"b1"} text="Delete filtered data" />
        <Button cName={"b2"} text="Get street address" />
      </div>
    </div>
  );
};

export default Filter;

import React from "react";
import Filter from "./Filter";
import Search from "./Search";
import "../css/choice.css";

const Choice = ({ render, setRender, isChecked, setIsChecked }) => {
  return (
    <div className="choice">
      <Filter isChecked={isChecked} setIsChecked={setIsChecked} />
      <Search />
    </div>
  );
};

export default Choice;

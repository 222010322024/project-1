import React from "react";
import "../css/search.css";
import Button from "./Button";
const Search = () => {
  return (
    <div className="search">
      <span>SEARCH (BY LOCATION, DATE, KEYWORDS, DETAILS ...)</span>
      <div className="find">
        <div className="s-box">
          <input type="text" name="" id="" placeholder="Search..." />
        </div>
        <div className="s-btn">Search</div>
        {/* <Button /> */}
      </div>
    </div>
  );
};

export default Search;

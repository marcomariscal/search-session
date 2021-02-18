import React from "react";
import "./SearchReset.scss";

const SearchReset = ({ handleSubmit, handleReset, disabledSubmit }) => {
  return (
    <div className="SearchReset">
      <div className="btn-wrapper">
        <button
          className="search-btn"
          onClick={handleSubmit}
          disabled={disabledSubmit}
        >
          <span>
            <img src={`/search-white.svg`} />
          </span>
          Search
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchReset;

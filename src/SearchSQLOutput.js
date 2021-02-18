import React from "react";
import "./SearchSQLOutput.scss";

const SearchSQLOutput = ({ output }) => {
  return (
    <div className="SearchSQLOutput">
      <div className="text-output-wrapper">
        <i>
          <span>{output}</span>
        </i>
      </div>
    </div>
  );
};

export default SearchSQLOutput;

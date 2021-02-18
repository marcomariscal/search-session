import React from "react";
import SearchFilter from "./SearchFilter";
import "./SearchFilters.scss";

const SearchFilters = ({ filters, addFilter, removeFilter, handleChange }) => {
  return (
    <div className="SearchFilters">
      {Object.keys(filters).map((id) => (
        <SearchFilter
          filterId={id}
          filter={filters[id]}
          removeFilter={removeFilter}
          handleChange={handleChange}
          key={id}
        />
      ))}
      <div className="and-btn-wrapper">
        <button className="and-btn" onClick={addFilter}>
          And
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;

import React from "react";
import InputWrapper from "./InputWrapper";
import "./SearchFilter.scss";

const SearchFilter = ({ filterId, filter, removeFilter, handleChange }) => {
  const handleRemove = () => {
    removeFilter(filterId);
  };

  return (
    <div className="SearchFilter">
      <button className="remove-filter-btn" onClick={handleRemove}>
        <img className="remove-filter-img" src={`/times.svg`} />
      </button>
      <InputWrapper
        filterId={filterId}
        filter={filter}
        handleChange={handleChange}
      />
    </div>
  );
};

export default SearchFilter;

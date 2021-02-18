import React from "react";
import Select from "./Select";
import { filterNames } from "./helpers/dataHelpers";
import "./InputWrapper.scss";

const InputWrapper = ({ filterId, filter, handleChange }) => {
  const { formInputs } = filter;

  const hasSecondInput = formInputs.operator === "between";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(filterId, name, value);
  };

  return (
    <div className="InputWrapper">
      <Select
        filterId={filterId}
        title={formInputs.filterName}
        optionValues={filterNames}
        name={"filterName"}
        handleChange={handleChange}
      />

      {hasSecondInput && (
        <div className="word">
          <span>is</span>
        </div>
      )}

      <Select
        filterId={filterId}
        title={formInputs.operator}
        optionValues={filter.options}
        name={"operator"}
        handleChange={handleChange}
      />

      <div className="input-wrapper">
        <input
          className="input-value"
          name={"firstInput"}
          value={formInputs.firstInput}
          type={filter.type}
          placeholder={filter.placeholder}
          onChange={handleInputChange}
          required
        />
      </div>

      {hasSecondInput && (
        <div className="word">
          <span>and</span>
        </div>
      )}

      {hasSecondInput && (
        <div className="input-wrapper">
          <input
            className="input-value"
            name={"secondInput"}
            value={formInputs.secondInput}
            type={filter.type}
            placeholder={filter.placeholder}
            onChange={handleInputChange}
            required
          />
        </div>
      )}
    </div>
  );
};

export default InputWrapper;

import React, { useState, useEffect } from "react";
import {
  filterFormData,
  generateNewFormItem,
  tableName,
} from "./helpers/dataHelpers";
import { generateSQL } from "./helpers/sqlHelpers";
import { validate } from "./helpers/validationHelpers";
import SearchFilters from "./SearchFilters";
import SearchReset from "./SearchReset";
import SearchSQLOutput from "./SearchSQLOutput";
import "./SearchForm.scss";

const SearchForm = () => {
  const newFormItem = generateNewFormItem();
  const INITIAL_FORM_STATE = { ...newFormItem };
  const INITIAL_OUTPUT_STATE = null;

  const [filters, setFilters] = useState(INITIAL_FORM_STATE);
  const [output, setOutput] = useState(INITIAL_OUTPUT_STATE);
  const [isValid, setIsValid] = useState(false);

  const handleAddFilter = () => {
    const newItem = generateNewFormItem();
    setFilters((fFilters) => ({ ...fFilters, ...newItem }));
  };

  const handleRemoveFilter = (filterId) => {
    if (Object.keys(filters).length === 1) {
      handleReset();
      return;
    }

    const formFiltersCopy = filters;
    delete formFiltersCopy[filterId];
    setFilters({ ...formFiltersCopy });
  };

  const handleSubmit = () => {
    setOutput(generateSQL(filters, tableName));
  };

  const handleReset = () => {
    setIsValid(false);
    setFilters(INITIAL_FORM_STATE);
    setOutput(INITIAL_OUTPUT_STATE);
  };

  const handleChange = (filterId, name, value) => {
    let currFilter = filters[filterId];

    // get new criteria
    if (name === "filterName") {
      currFilter = filterFormData.filter((c) => c.name === value)[0];
    }

    if (name === "operator" && value !== "between") {
      // reset second input
      currFilter.secondInput = "";
    }

    setFilters((fCriteria) => ({
      ...fCriteria,
      [filterId]: {
        ...currFilter,
        formInputs: { ...currFilter.formInputs, [name]: value },
      },
    }));
  };

  useEffect(() => {
    const validData = validate(filters);
    setIsValid(validData);
  }, [filters]);

  return (
    <div className="SearchForm">
      <div className="header">Search for Sessions</div>
      <SearchFilters
        filters={filters}
        addFilter={handleAddFilter}
        removeFilter={handleRemoveFilter}
        handleChange={handleChange}
      />
      <SearchReset
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        disabledSubmit={!isValid}
      />
      {output && <SearchSQLOutput output={output} />}
    </div>
  );
};

export default SearchForm;

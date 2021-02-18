import React, { useState, useRef, useEffect } from "react";
import "./Select.scss";

const Select = ({ filterId, name, title, optionValues, handleChange }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenuOpen = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const handleBlur = (e) => {
    setMenuIsOpen(false);
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleItemClick = (value) => {
    setMenuIsOpen(false);
    handleChange(filterId, name, value);
  };

  const dropDownItemsRender =
    optionValues &&
    optionValues.map((val, idx) => (
      <li
        className="dropdown-menu-item"
        onClick={() => handleItemClick(val)}
        value={val}
        key={idx}
      >
        {val}
      </li>
    ));

  return (
    <div className="Select">
      <div className="dropdown" onClick={toggleMenuOpen}>
        <span className="title">{title}</span>
        <span className="caret">
          <img src={`/chevron-${menuIsOpen ? "up" : "down"}.svg`} />
        </span>
      </div>
      {menuIsOpen && (
        <div className="dropdown-menu" onBlur={handleBlur} ref={wrapperRef}>
          <ul className="dropdown-menu-list">{dropDownItemsRender}</ul>
        </div>
      )}
    </div>
  );
};

export default Select;

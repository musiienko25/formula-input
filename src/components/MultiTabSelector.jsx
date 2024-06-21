import React, { useState } from "react";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "./data";

const CustomInput = ({ value, onChange, onKeyDown, ...props }) => (
  <components.Input
    {...props}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
  />
);

const MultiTabSelector = () => {
  const animatedComponents = makeAnimated();
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setSelectedOptions((prevSelected) => [
          ...prevSelected,
          { label: inputValue, value: inputValue },
        ]);
        setInputValue("");
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div>
      <label htmlFor="multi-select" className="label">
        Select Colours
      </label>
      <Select
        id="multi-select"
        closeMenuOnSelect={false}
        components={{ ...animatedComponents, Input: CustomInput }}
        value={selectedOptions}
        isMulti
        options={colourOptions}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </div>
  );
};

export default MultiTabSelector;

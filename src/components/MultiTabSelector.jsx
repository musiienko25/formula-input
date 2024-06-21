import React, { useState } from "react";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "./data";
import "./styles.css"; // Підключення зовнішніх стилів

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
        const optionExists = colourOptions.find(
          (option) => option.label.toLowerCase() === inputValue.toLowerCase()
        );

        if (optionExists) {
          setSelectedOptions((prevSelected) => [
            ...prevSelected,
            { label: optionExists.label, value: optionExists.value },
          ]);
        } else {
          setSelectedOptions((prevSelected) => [
            ...prevSelected,
            { label: inputValue, value: inputValue, isText: true },
          ]);
        }
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

  const CustomMultiValueContainer = ({ children, ...props }) => (
    <components.MultiValueContainer {...props}>
      {props.data.isText ? <span>{props.data.label}</span> : children}
    </components.MultiValueContainer>
  );

  return (
    <div className="main">
      <label htmlFor="multi-select">
        <div className="label upper-label">
          <div>
            <div className="icons-container">
              <div className="left-icons">
                <span className="arrow-icon">&#9660;</span>
              </div>
            </div>
          </div>
          <div className="upper-label_right">
            <span className="info-icon">ℹ️</span>
            <span className="dots-icon">...</span>
          </div>
        </div>
        <div className="lower-label">
          <div className="lower-label_error">Error</div>
          <div className="lower-label_date">Jun 2024</div>
        </div>
      </label>
      <Select
        id="multi-select"
        closeMenuOnSelect={false}
        components={{
          ...animatedComponents,
          Input: CustomInput,
          DropdownIndicator: () => null,
          MultiValueContainer: CustomMultiValueContainer,
        }}
        value={selectedOptions}
        isMulti
        options={colourOptions}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder=""
      />
    </div>
  );
};

export default MultiTabSelector;

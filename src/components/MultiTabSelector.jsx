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
        // Перевірка чи введений текст є в списку опцій
        const optionExists = colourOptions.find(
          (option) => option.label.toLowerCase() === inputValue.toLowerCase()
        );

        if (optionExists) {
          // Якщо опція існує, додаємо її до вибраних
          setSelectedOptions((prevSelected) => [
            ...prevSelected,
            { label: optionExists.label, value: optionExists.value },
          ]);
        } else {
          // Якщо опція не існує, додаємо як текст
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

  // Компонент для відображення власних значень, які не є опціями
  const CustomMultiValueContainer = ({ children, ...props }) => (
    <components.MultiValueContainer {...props}>
      {props.data.isText ? <span>{props.data.label}</span> : children}
    </components.MultiValueContainer>
  );

  return (
    <div>
      <label htmlFor="multi-select" className="label">
        Select Colours
      </label>
      <Select
        id="multi-select"
        closeMenuOnSelect={false}
        components={{
          ...animatedComponents,
          Input: CustomInput,
          MultiValueContainer: CustomMultiValueContainer,
        }}
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

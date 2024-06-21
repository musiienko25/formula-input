import React from "react";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import "./styles.css";

const fetchColours = async () => {
  const res = await fetch(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};

const useStore = create((set) => ({
  inputValue: "",
  selectedOptions: [],
  setInputValue: (value) => set({ inputValue: value }),
  setSelectedOptions: (options) => set({ selectedOptions: options }),
}));

const CustomInput = ({ value, onChange, onKeyDown, ...props }) => {
  // Filter out unwanted props
  const { onExited, ...filteredProps } = props;
  return (
    <components.Input
      {...filteredProps}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

const MultiTabSelector = () => {
  const animatedComponents = makeAnimated();
  const { inputValue, selectedOptions, setInputValue, setSelectedOptions } =
    useStore();

  const {
    data: colourOptions,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["colours"],
    queryFn: fetchColours,
  });

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        const optionExists = colourOptions?.find(
          (option) => option.label.toLowerCase() === inputValue.toLowerCase()
        );

        if (optionExists) {
          setSelectedOptions([
            ...selectedOptions,
            { label: optionExists.label, value: optionExists.value },
          ]);
        } else {
          setSelectedOptions([
            ...selectedOptions,
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading options</div>;

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

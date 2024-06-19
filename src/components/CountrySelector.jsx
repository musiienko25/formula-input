import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "./data";

function CountrySelector() {
  const animatedComponents = makeAnimated();
  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        options={colourOptions}
      />
    </div>
  );
}

export default CountrySelector;

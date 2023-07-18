import { CustomDropdownProps } from "@/Types";
import React from "react";

const CustomDropDown: React.FC<CustomDropdownProps> = ({
  label,
  name,
  value,
  error,
  touched,
  handleChange,
  handleBlur,
  options,
  className,
}) => {
  return (
    <div className={`mx-4`}>
      <label
        className="block uppercase tracking-wide text-darkText text-xs font-bold mb-2"
        htmlFor="grid-state"
      >
        {label}
      </label>
      <div className={`relative mb-1  ${className}`}>
        <select
          className="block appearance-none w-full bg-darkText bg-opacity-10  border border-darkText border-opacity-30 text-darkText py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-darkText"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>
            Choose ...
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <p className="text-red-500 text-xs italic">{touched && error && error}</p>
    </div>
  );
};

export default CustomDropDown;

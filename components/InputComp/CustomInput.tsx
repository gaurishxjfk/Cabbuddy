import { CustomInputProps } from "@/Types";
import React from "react";

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  placeholder,
  type,
  value,
  error,
  touched,
  handleChange,
  handleBlur,
  className,
  max
}) => (
  <span className="px-4">
    <label
      htmlFor={name}
      className="block uppercase tracking-wide text-darkText text-xs font-bold mb-2"
    >
      {label}
    </label>

    <input
      className={`appearance-none block w-full bg-darkText bg-opacity-10 text-gray-700 border ${touched && error && "border-red-500"} rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white ${className}`}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      onBlur={handleBlur}
      max={max}
    />
    <p className="text-red-500 text-xs italic">{touched && error && error}</p>
  </span>
);

export default CustomInput;

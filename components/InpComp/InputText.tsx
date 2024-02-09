import { CustomInputProps } from "@/Types";
import React from "react";

const InputText: React.FC<CustomInputProps> = ({
  label,
  name,
  placeholder,
  type,
  value,
  error,
  handleChange,
  className,
  errormsg,
  customHandleChange
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    customHandleChange && customHandleChange(name, e.target.value, e.target.value.length === 0);
  };
  return (
    <span className="w-full">
      <label
        htmlFor={name}
        className={`block tracking-wide text-darkText text-xs font-bold mb-1 ml-1 ${
          error && "text-red-500"
        }`}
      >
        {label}
      </label>
      <input
        className={`appearance-none block text-gray-700 border-2 border-x-0 border-t-0 w-full border-darkText
                    bg-mainbg rounded-t-xl p-2 px-2 mb-1 text-lg leading-tight focus:outline-none focus:bg-white ${className} ${
          error && "border-red-600"
        }`}
        type={type}
        name={name}
        onChange={handleInputChange}
        value={value}
        placeholder={placeholder}
      />
      <p className="text-xs text-red-500 ml-1">{error ? errormsg : ""}</p>
    </span>
  );
};

export default InputText;

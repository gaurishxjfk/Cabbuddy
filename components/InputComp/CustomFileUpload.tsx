"use client";
import { CustomFileUploadProps } from "@/Types";
import { fileToBase64 } from "@/helpers/filetoBcase64";
import React from "react";

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  label,
  name,
  value,
  error,
  touched,
  handleChange,
  handleBlur,
  className,
}) => {
  return (
    <div className="flex flex-col px-4">
      <label
        htmlFor={name}
        className="block uppercase tracking-wide text-darkText text-xs font-bold mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        onChange={async (event) => {
          if (event.target.files?.[0]) {
            const cabImageBase64 = await fileToBase64(event.target.files?.[0]);
            handleChange(name, cabImageBase64 as string);
          }
        }}
        onBlur={handleBlur}
        className={`appearance-none block w-full bg-darkText bg-opacity-10 text-darkText border rounded py-2 px-4 mb-1 leading-tight focus:outline-slate-700 focus:bg-white ${
          touched && error && "border-red-500"
        } ${className}`}
      />
      <p className="text-red-500 text-xs italic">{touched && error && error}</p>
    </div>
  );
};

export default CustomFileUpload;

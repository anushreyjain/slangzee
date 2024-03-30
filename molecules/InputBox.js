/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unknown-property */
/* eslint-disable max-len */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

const InputBox = forwardRef(
  (
    {
      variant,
      type = "text",
      register,
      id,
      dbName,
      errors,
      label,
      labelClass,
      placeholder,
      wrapperClasses,
      ...property
    },
    ref
  ) => {
    return (
      <div className={`relative w-full ${wrapperClasses}`}>
        {label && (
          <label
            className={`text-white-800 text-base md:text-xl font-medium ${labelClass}`}
          >
            {label}
          </label>
        )}
        <input
          className={`w-full px-3 text-sm md:text-base py-2 outline-none
         bg-customGray-900 rounded border border-transparent
             focus:border-customGray-800 placeholder:text-customGray-700 mt-2 ${property.className}`}
          id={id}
          type={type}
          placeholder={placeholder}
          {...(register && { ...register(dbName) })}
          {...{
            ...property,
            ref,
          }}
        />
        <p>{errors}</p>
      </div>
    );
  }
);

export default InputBox;

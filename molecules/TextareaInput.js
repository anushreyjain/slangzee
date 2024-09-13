/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unknown-property */
/* eslint-disable max-len */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

const TextareaInput = forwardRef(
  (
    {
      variant,
      register,
      id,
      dbName,
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
            className={`text-secondary-900 text-base md:text-xl font-medium ${labelClass}`}
          >
            {label}
          </label>
        )}
        <textarea
          className={`w-full px-3 text-sm md:text-base py-2 outline-none
         bg-customGray-900 rounded border border-transparent
             focus:border-customGray-800 placeholder:text-customGray-700 scrollbar mt-2  resize-none ${property.className}`}
          id={id}
          rows={4 }
          placeholder={placeholder}
          {...(register && { ...register(dbName) })}
          {...{
            ...property,
            ref,
          }}
        />
      </div>
    );
  }
);

export default TextareaInput;

import React from "react";

const LinkButton = ({ label, onClickHandler, ...property }) => {
  return (
    <button
      onClick={onClickHandler}
      className={`hover:underline text-customGray-700 text-ms lg:text-xl hover:text-white-900 
      transition-all duration-200 active:scale-90 ${property.className}`}
    >
      {label}
    </button>
  );
};

export default LinkButton;

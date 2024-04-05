import React from "react";

const AddSlangCard = ({ handleAddSlang }) => {
  return (
    <div
      onClick={handleAddSlang}
      className="rounded-lg border border-customGray-900 
    py-4 px-5 w-full min-h-[11rem] max-h-[11rem] cursor-pointer hover:scale-105 
    transition-all duration-300 hover:border-secondary-900"
    >
      Add creativity
    </div>
  );
};

export default AddSlangCard;

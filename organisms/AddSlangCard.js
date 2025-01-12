import IcomoonIcon from "@/components/IcomoonIcon";
import React from "react";

const AddSlangCard = ({ handleAddSlang }) => {
  return (
    <div
      onClick={handleAddSlang}
      className="rounded-lg border border-customGray-900 
    py-4 px-5 w-full min-h-[11rem] max-h-[11rem] cursor-pointer lg:hover:scale-105 
    transition-all duration-300 hover:border-secondary-900 flex flex-col gap-y-4 justify-center items-center hover:text-secondary-900 text-xl"
    >
      <div className="rounded-lg px-4 py-3 border border-secondary-900">
        <IcomoonIcon icon={'plus'} size={20} color={'#f79d65'} />
      </div>
      Add your Creativity
    </div>
  );
};

export default AddSlangCard;

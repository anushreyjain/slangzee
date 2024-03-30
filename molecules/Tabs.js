import React from "react";

const Tabs = ({ tabs, activeTab, tabHandler, ...property }) => {
  return (
    <ul className="flex items-center w-full space-x-4 mt-10">
      {/* {tabs.map((tab, index) => (
        <li
          key={index}
          onClick={tab.clickHandler}
          className={`border-b cursor-pointer hover:text-white-900 hover:border-white-900
         transition-all duration-300 border-customGray-900 text-customGray-800 
         pb-2 text-4xl text-center ${property.className} w-full`}
        >
          {tab.title}
        </li>
      ))} */}
    </ul>
  );
};

export default Tabs;

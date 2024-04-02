import React from "react";

const Tabs = ({ tabs, activeTab, tabHandler, ...property }) => {
  return (
    <ul
      className={`flex items-center w-full space-x-4 mt-14 ${property.className}`}
    >
      {tabs.map((tab, index) => (
        <li
          key={index}
          onClick={() => tabHandler(tab.value)}
          className={` ${
            activeTab === tab.value
              ? "text-secondary-900 border-secondary-900"
              : "text-customGray-800 border-customGray-900"
          } border-b cursor-pointer hover:text-white-900 hover:border-white-800
         transition-all duration-300   text-3xl
         pb-2 text-center  active:scale-90 ${property.className} w-full`}
        >
          {tab.title}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;

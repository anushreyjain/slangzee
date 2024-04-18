import IcomoonIcon from "@/components/IcomoonIcon";
import React from "react";

const Tabs = ({ tabs, activeTab, tabHandler, ...property }) => {
    return (
        <div className="w-full flex justify-center">
            <ul
                className={`hidden lg:flex items-center w-full space-x-4 mt-14 ${property.className}`}
            >
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        onClick={() => tabHandler(tab.value)}
                        className={` ${activeTab === tab.value
                                ? "text-secondary-900 border-secondary-900"
                                : "text-customGray-800 border-customGray-900"
                            } border-b cursor-pointer hover:text-white-900 hover:border-white-800
            transition-all duration-300 text-xl  xl:text-2xl
            pb-2 text-center  active:scale-90 ${property.className} w-full`}
                    >
                        {tab.title}
                    </li>
                ))}
            </ul>

            <div className={`lg:hidden border border-customGray-900 px-2 py-2 my-6 rounded-full flex items-center justify-between w-fit space-x-5`}>
                {tabs.map((tab, index) => (
                    <span key={index} onClick={() => tabHandler(tab.value)}
                        className={`w-11 h-11 rounded-full border ${activeTab === tab.value ? 'border-secondary-900' : 'border-customGray-900'}  flex items-center justify-center`}>
                        <IcomoonIcon icon={tab.icon} color={'#404040'} size={'50%'} />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Tabs;

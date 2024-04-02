import IcomoonIcon from "@/components/IcomoonIcon";
import React from "react";

const IconWithContainer = ({
  iconName,
  containerHeight,
  containerWidth,
  iconColor,
  clickHandler = () => {},
  isClickable = true,
  ...property
}) => {
  return (
    <div
      onClick={isClickable ? clickHandler : () => {}}
      className={` ${containerWidth || "w-6"} ${containerHeight || "h-6"} 
   ${
     isClickable ? " cursor-pointer hover:scale-105 active:scale-95" : ""
   }  transition-all duration-200 group
     relative flex justify-center items-center ${property.className}`}
    >
      <IcomoonIcon icon={iconName} size={"100%"} color={iconColor} />
    </div>
  );
};

export default IconWithContainer;

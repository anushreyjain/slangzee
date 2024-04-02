import React from "react";
import { Triangle } from "react-loader-spinner";

const Loader = ({
  loaderheight,
  loaderWidth,
  placeholderWidth,
  placeholderHeight,
  loaderColor,
  ...property
}) => {
  return (
    <div
      className={`flex items-center justify-center ${placeholderWidth} ${placeholderHeight} ${property.className}`}
    >
      <Triangle
        height={loaderheight || "80"}
        width={loaderWidth || "80"}
        color={loaderColor || '#AC916B'}
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;